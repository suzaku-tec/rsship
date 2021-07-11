'use strict';

const fs = require('fs');
const path = require('path');

const { RsshipIpcToMainArgs } = require("./rsshipIpcArgs")

const MODAL_NAME = '#exampleModal'
class RsshipModal {

  constructor(rsshipIpcRenderer) {
    this._rsshipIpcRenderer = rsshipIpcRenderer;
  }

  setupModal() {
    $(MODAL_NAME).on('hidden.bs.modal', () => {
      var opmlPath = document.getElementById("opmlFilePath");
      if(opmlPath && opmlPath.nodeValue) {
        console.log(opmlPath)
        console.log(fs.readFileSync(opmlPath))
      }

      this._initModal();
    })
  }

  showOpmlImportDialog() {
    this._setModalTitle("Import Opml File");

    var body = `
      <div id="opmlFilePath"></div>
      <button id="opmlFileSelect" type="button" class="btn btn-primary btn-sm btn-block">ファイル選択</button>
    `;
    this._getModalBody().append(body)

    var footer = `
      <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn">close</button>
      <button type="button" class="btn btn-primary" id="importOpml">import opml</button>
    `
    this._getModalFooter().append(footer)

    $("#opmlFileSelect").on("click", () => {
      this._openFile();
    })

    $("#importOpml").on("click", () => {
      var opmlPath = $('#opmlFilePath').text()

      if(opmlPath) this._creteFeedForOpml(opmlPath)

      $('#exampleModal').modal('hide')
    })

    this._getModal().modal()
  }

  showProgressModal(title) {

    var body = `
      <div id="progress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
      </div>
      `
    this._getModalBody().append(body)

    var t = title ?? "進捗状況"
    this._setModalTitle(t);
    this._getModal().modal()
  }

  showTextModal(title, text) {

    var body = `
      <textarea style="height:75vh; width: 100%;">${text}</textarea>
      `
    this._getModalBody().append(body)

    var t = title ?? ""
    this._setModalTitle(t);
    this._getModal().modal()
  }

  showMessageDialog(title, message) {
    this._setModalTitle(title);
    this._getModalBody().append(message)
    this._getModal().modal()
  }

  _modalFade() {
    this._getModal().fade()
  }

  _getModal() {
    return $(MODAL_NAME)
  }

  _getModalBody() {
    return $('#exampleModalBody')
  }

  _getModalFooter() {
    return $('#exampleModalFooter')
  }

  _setModalTitle(title) {
    $("#exampleModalTitle").text(title)
  }

  _initModal() {
    $("#exampleModalTitle").empty()
    $('#exampleModalBody').empty()
    $('#exampleModalFooter').empty()
  }

  //openFileボタンが押されたとき（ファイル名取得まで）
  _openFile() {
    var arg = new RsshipIpcToMainArgs();
    arg.type = RsshipOpenDialog.MessageType;
    var res = rsshipIpcRenderer.sendSync(RsshipOpenDialog.MessageType, {})
    $("#opmlFilePath").text(res)
  }

  async _creteFeedForOpml(opmlPath) {
    var contents = fs.readFileSync(opmlPath, 'utf8')
    const opml = new DOMParser().parseFromString(contents, "text/xml");

    var outlines = opml.getElementsByTagName("outline");

    var errFeedList = []
    for (const outline in outlines) {
      if (Object.hasOwnProperty.call(outlines, outline)) {
        const element = outlines[outline];

        var feedUrl = element.getAttribute("xmlUrl")

        if(!feedUrl) continue;

        var feedTitle = element.getAttribute("text")
        console.log(feedUrl);
        try {
          var feedItems = await feed.getRssFeed(feedUrl);
          console.log(feedItems)

          var feedFilePath = path.join(feed_path, feedTitle + ".json")

          fs.writeFileSync(
            path.resolve(feedFilePath),
            JSON.stringify(feedItems, null, 2),
            (err) => {
              if (err) throw err;
            }
          );
        } catch(e) {
          errFeedList.push(feedTitle)
        }
      }
    }

    if(errFeedList) {
      var errorListStr = errFeedList.join("<br>")
      this.showMessageDialog("取り込みエラー", "以下のRSSは読み取れませんでした。<br>" + errorListStr)
    }
  }

}

module.exports = { RsshipModal }

