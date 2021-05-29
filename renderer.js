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
    feedList.appendChild(feedTag)
  });
});


function setRssView(pathName) {

}

// https://suzaku-tec.hatenadiary.jp/rss
