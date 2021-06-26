class RsshipModal {

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

    this._getModal().modal()
  }

  showProgressModal(title) {
    var body = `
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
      </div>
      `
      this._getModalBody().append(body)

      var t = title ?? "進捗状況"
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
    return $('#exampleModal')
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

  initModal() {
    $("#exampleModalTitle").empty()
    $('#exampleModalBody').empty()
    $('#exampleModalFooter').empty()
  }
}

module.exports = { RsshipModal }

