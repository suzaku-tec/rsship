const RssIpcEvent = require("./rsshipIpcEvent");
const { dialog } = require('electron')

class RsshipOpenDialog extends RssIpcEvent {

  static MessageType = "showOpenDialog"

  mainProcAction() {
    console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
  }

  rendererProcAction() {
    throw new Error("Not Defined!")
  }
}

module.exports = RsshipOpenDialog;
