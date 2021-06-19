const RssIpcEvent = require("./rsshipIpcEvent");
const { dialog } = require('electron')

class RsshipOpenDialog extends RssIpcEvent {

  static MessageType = "showOpenDialog"

  mainProcAction() {
    return dialog.showOpenDialogSync({ properties: ['openFile', 'multiSelections'] });
  }
}

module.exports = RsshipOpenDialog;
