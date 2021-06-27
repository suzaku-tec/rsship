'use strict';

let Parser = require('rss-parser');
let parser = new Parser();
class Feed {

  /**
   *
   * @param {string} feedName
   * @param {number} cnt
   * @returns
   */
  static createFeedTag(feedName, cnt, jsonFilePath) {
    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center cursor-hand";
    li.innerText = feedName;
    li.dataset.fp = jsonFilePath

    if(cnt) {
      var countIcon = this.getCountIcon(cnt)
      li.appendChild(countIcon)
    }

    return li;
  }

  /**
   *
   * @param {Number} count
   * @returns
   */
  static getCountIcon(count) {

    // アイコンタグの生成
    var span = document.createElement("span")
    span.className = "badge badge-primary badge-pill"

    // 数値判定
    if(!isNaN(count) && isFinite(count)) {
      span.innerText = count;
    } else {
      span.innerText = 0;
    }

    return span;
  }

  static async getRssFeed(url) {
    let rssItem = await parser.parseURL(url);
    rssItem.feedUrl = url
    return rssItem;
  }
}

module.exports = Feed
