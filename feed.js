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
  static createFeedTag(feedName, cnt) {
    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerText = feedName;

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

}

module.exports = Feed
