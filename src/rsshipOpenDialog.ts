'use strict';

import RssIpcEvent from "./rsshipIpcEvent";
import { dialog } from 'electron';

export default class RsshipOpenDialog extends RssIpcEvent {

  static MessageType = "showOpenDialog"

  mainProcAction() {
    return dialog.showOpenDialogSync({ properties: ['openFile', 'multiSelections'] });
  }
}
