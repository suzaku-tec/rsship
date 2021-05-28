'use strict';

class Feed {

  static createFeedTag(feedName) {

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerText = feedName;
    return li;
  }

  /**
   *
   * @param {HTMLLIElement} feedTag
   * @param {Number} count
   * @returns
   */
  static addCountIcon(feedTag, count) {

    var span = document.createElement("span")
    span.className = "badge badge-primary badge-pill"
    span.innerText = count;

    feedTag.innerHTML = span;

    return span;
  }
}

module.exports = Feed
