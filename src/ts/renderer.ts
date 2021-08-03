// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

"use strict";

let feed = (global as any).feed;
let RsshipTab = (global as any).RsshipTab;
let fs = (global as any).fs;
let path = (global as any).path;
let Grid = global.grid;
const { ipcRenderer, RsshipIpcToMainArgs, rsshipIpcRenderer, RsshipOpenDialog, rsshipModal, Store, RsshipSettings, } = (global as any).native;
var feedList = document.getElementById("feed-list");

const feed_path = "feed";
const store = new Store();

var grid: any = null;

var rsshipSettings = null
var cyleTimer = null

// rssファイルの読み込み
fs.readdir(feed_path, (err: any, fileNames: any) => {
  fileNames.forEach((fileName: any) => {
    const jsonFilePath = path.join(feed_path, fileName);
    let json = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

    // 未読数のカウント
    let count = json.items.reduce((prev: any, item: any) => {
      return prev + (item.isRead ? 0 : 1);
    }, 0);

    let tagName = path.basename(fileName);
    var feedTag = feed.createFeedTag(tagName, count, jsonFilePath);
    feedTag.addEventListener("click", {
      filePath: jsonFilePath,
      handleEvent: setFeedItemList,
    });

    feedList?.appendChild(feedTag);
  });
});

// event handler

/**
 * show feed item list
 *
 * @param {*} e
 */
function setFeedItemList(this: any, e: any) {
  reload(this.filePath);
}

var reloadButton = document.getElementById("reloadButton");
reloadButton?.addEventListener("click", async () => {
  // サイトから最新のフィード情報取得
  var docs = (document.getElementById("docs") as any).value;
  var feedItems = await feed.getRssFeed(docs);

  // ファイルのフィード情報取得
  var feedFilePath = (document.getElementById("feedFilePath") as any).value;
  let json = JSON.parse(fs.readFileSync(feedFilePath, "utf8"));

  // 差分の抽出
  var diffList = feedItems.items.filter((feedItem: any) => {
    return !json.items.find((jsonItem: any) => {
      return jsonItem.link === feedItem.link;
    });
  });

  // 最近追加されたものなら追加
  diffList.forEach((addItem: any) => {
    if (json.items[0].isoDate < addItem.isoDate) {
      json.items.unshift(addItem);
    }
  });

  // ファイルに反映
  if (diffList.length) {
    fs.writeFileSync(
      path.resolve(feedFilePath),
      JSON.stringify(json, null, 2),
      (err: any) => {
        if (err) throw err;
      }
    );
  }

  reload(feedFilePath);
});

/**
 * フィード一覧の更新
 * @param {読み込むファイルパス} filePath
 */
function reload(filePath: any) {
  let json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  (document.getElementById("docs") as any).value = json.feedUrl;
  (document.getElementById("feedFilePath") as any).value = filePath;

  let count = json.items.reduce((prev: any, item: any) => {
    return prev + (item.isRead ? 0 : 1);
  }, 0);

  var tmpFeedList = document.getElementById("feed-list");

  if(tmpFeedList) Array.from(tmpFeedList.children)
    .filter((ul) => {
      return (ul as any).dataset.fp === filePath;
    })
    .forEach((icon) => {
      Array.from(icon.children).forEach((span) => {
        span.textContent = count;
      });
    });

  var data = json.items
    .filter((item: any) => {
      return !item.isRead;
    })
    .map((item: any) => {
      return [item.title, item.pubDate, item.link];
    });

  if (grid) {
    // データの更新だけして終了
    grid
      .updateConfig({
        data: data,
      })
      .forceRender();
    return;
  } else {
    grid = new Grid({
      columns: ["title", "pubDate", { name: "link", hidden: true }],
      data: data,
    }).render(document.getElementById("feedItemList"));
  }

  // 既読処理
  grid.on("rowClick", (e: any, row: any) => {
    var link = row.cells[2].data;
    let feedFilePath = (document.getElementById("feedFilePath") as any).value;

    // 選択した行を既読にする
    let rssJson = JSON.parse(fs.readFileSync(feedFilePath, "utf8"));
    rssJson.items
      .filter((item: any) => {
        return item.link === link;
      })
      .forEach((item: any) => {
        item.isRead = true;
      });

    // JSONを更新
    fs.writeFileSync(
      path.resolve(feedFilePath),
      JSON.stringify(rssJson, null, 2),
      (err: any) => {
        if (err) throw err;
      }
    );

    reload(feedFilePath);
  });
}

var modalCloseElements = document.getElementsByClassName("modal-close");
Array.prototype.forEach.call(modalCloseElements, (mcEl) => {
  mcEl.addEventListener("click", () => {
    var dialog = document.getElementById("msg-modal");
    dialog?.classList.remove("modal.show");
    dialog?.classList.add("modal.fade");
  });
});

window.showSettingModal = function showSettingModal() {
  console.log("showSettingModal")
  const jsonObject = fs.readFileSync(store.path, "utf8");
  rsshipModal.showTextModal("settings", jsonObject);
}

function init() {
  var tab = new RsshipTab();
  tab.addTab("sample");

  rsshipSettings = new RsshipSettings()
  rsshipSettings.init(store);
}

function getSettingValue(key: any) {
  const jsonObject = fs.readFileSync(store.path, 'utf8');
  const settingJson = JSON.parse(jsonObject)

  return settingJson[key]
}

function isNumeric(value: any) {
  return !isNaN(value);
}

rsshipModal.setupModal();

init();
