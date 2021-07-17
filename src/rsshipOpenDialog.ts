'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RssIpcEven... Remove this comment to see the full error message
const RssIpcEvent = require("./rsshipIpcEvent");
const { dialog } = require('electron')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipOpen... Remove this comment to see the full error message
class RsshipOpenDialog extends RssIpcEvent {

  static MessageType = "showOpenDialog"

  mainProcAction() {
    return dialog.showOpenDialogSync({ properties: ['openFile', 'multiSelections'] });
  }
}

module.exports = RsshipOpenDialog;
