// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

'use strict';

let feed = window.feed;
let fs = window.fs;
let path = window.path;
let Grid = window.Grid;

var feedList = document.getElementById("feed-list");

const feed_path = "feed";

// rssファイルの読み込み
fs.readdir(feed_path, (err, fileNames) => {
  fileNames.forEach(fileName => {

    const jsonFilePath = path.join(feed_path, fileName)
    let json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // 未読数のカウント
    let count = json.items.reduce((prev, item) => {
      return prev + (item.isRead ? 0 : 1)
    }, 0)

    var feedTag = feed.createFeedTag(fileName, count);
    feedTag.addEventListener("click", {filePath: jsonFilePath, handleEvent: setFeedItemList});

    feedList.appendChild(feedTag)
  });
});

// event handler
function setFeedItemList(e) {
  let json = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));

  // 表示対象のデータを取得
  var data = json.items.filter(item => {
    return !item.isRead
  }).map(item => {
    return [
      item.title,
      item.pubDate,
      item.link,
    ]
  })

  // 画面表示データの生成
  const grid = new Grid({
    columns: ["title", "pubDate", {name: "link", hidden: true}],
    data: data
  }).render(document.getElementById("feedItemList"));

  // 既読処理
  grid.on("rowClick", (e, row) => {
    var link = row.cells[2].data

    // 選択した行を既読にする
    let json = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    json.items.filter(item => {
      return item.link === link
    }).forEach(item => {
      item.isRead = true
    })

    // JSONを更新
    fs.writeFileSync(
      path.resolve(this.filePath),
      JSON.stringify(json, null, 2),
      (err) => {
        if (err) throw err;
      }
    )
  })
}




// https://suzaku-tec.hatenadiary.jp/rss
