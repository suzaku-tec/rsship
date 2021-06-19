// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

'use strict';

let feed = window.feed;
let Tab = window.tab;

let fs = window.fs;
let path = window.path;
let Grid = window.Grid;

const { ipcRenderer, RsshipIpcToMainArgs, rsshipIpcRenderer, RsshipOpenDialog } = window.native;

var feedList = document.getElementById("feed-list");

const feed_path = "feed";

var grid = null;

// rssファイルの読み込み
fs.readdir(feed_path, (err, fileNames) => {
  fileNames.forEach(fileName => {

    const jsonFilePath = path.join(feed_path, fileName)
    let json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // 未読数のカウント
    let count = json.items.reduce((prev, item) => {
      return prev + (item.isRead ? 0 : 1)
    }, 0)

    let tagName = path.basename(fileName);
    var feedTag = feed.createFeedTag(tagName, count);
    feedTag.addEventListener("click", {filePath: jsonFilePath, handleEvent: setFeedItemList});

    feedList.appendChild(feedTag)
  });
});

// event handler

/**
 * show feed item list
 *
 * @param {*} e
 */
function setFeedItemList(e) {
  reload(this.filePath)
}


var reloadButton = document.getElementById("reloadButton")
reloadButton.addEventListener("click", async () => {
  // サイトから最新のフィード情報取得
  var docs = document.getElementById("docs").value;
  var feedItems = await feed.getRssFeed(docs);

  // ファイルのフィード情報取得
  var feedFilePath = document.getElementById("feedFilePath").value;
  let json = JSON.parse(fs.readFileSync(feedFilePath, 'utf8'));

  // 差分の抽出
  var diffList = feedItems.items.filter(feedItem => {
    return !json.items.find(jsonItem => {
      return jsonItem.link === feedItem.link
    })
  })

  // 最近追加されたものなら追加
  diffList.forEach(addItem => {
    if(json.items[0].isoDate < addItem.isoDate) {
      json.items.unshift(addItem)
    }
  })

  // ファイルに反映
  if (diffList.length) {
    fs.writeFileSync(
      path.resolve(feedFilePath),
      JSON.stringify(json, null, 2),
      (err) => {
        if (err) throw err;
      }
    )
  }

  reload(feedFilePath)
})

/**
 * フィード一覧の更新
 * @param {読み込むファイルパス} filePath
 */
function reload(filePath) {
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  document.getElementById("docs").value = json.feedUrl;
  document.getElementById("feedFilePath").value = filePath

  var data = json.items.filter(item => {
    return !item.isRead
  }).map(item => {
    return [
      item.title,
      item.pubDate,
      item.link,
    ]
  })

  if(grid) {
    // データの更新だけして終了
    grid.updateConfig({
      data: data
    }).forceRender();
    return;
  } else {
    grid = new Grid({
      columns: ["title", "pubDate", {name: "link", hidden: true}],
      data: data
    }).render(document.getElementById("feedItemList"));
  }


  // 既読処理
  grid.on("rowClick", (e, row) => {
    var link = row.cells[2].data

    console.log(row)
    let feedFilePath = document.getElementById("feedFilePath").value

    // 選択した行を既読にする
    let rssJson = JSON.parse(fs.readFileSync(feedFilePath, 'utf8'));
    rssJson.items.filter(item => {
      return item.link === link
    }).forEach(item => {
      item.isRead = true
    })

    // JSONを更新
    fs.writeFileSync(
      path.resolve(feedFilePath),
      JSON.stringify(rssJson, null, 2),
      (err) => {
        if (err) throw err;
      }
    )

    reload(feedFilePath);
  })
}

var modalCloseElements = document.getElementsByClassName("modal-close");
Array.prototype.forEach.call(modalCloseElements, (mcEl) => {
  mcEl.addEventListener("click", () => {
    var dialog = document.getElementById("msg-modal")
    dialog.classList.remove("modal.show")
    dialog.classList.add("modal.fade");
    })
})


$('#exampleModal').on('hidden.bs.modal', function () {
  var opmlPath = document.getElementById("opmlImport").value;
  if(opmlPath) {
    console.log(opmlPath)
    console.log(fs.readFileSync(opmlPath))
  }
})


var closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  var opml = document.getElementById("opmlImport").value;
})


function init() {
  var tab = new Tab();
  tab.addTab("sample")
}

$("#opmlFileSelect").on("click", () => {
  openFile();
})

//openFileボタンが押されたとき（ファイル名取得まで）
function openFile() {
  var arg = new RsshipIpcToMainArgs();
  arg.type = RsshipOpenDialog.MessageType;
  var res = rsshipIpcRenderer.sendSync(RsshipOpenDialog.MessageType, {})
  console.log(res)
  $("#opmlFilePath").text(res)
}

init();
