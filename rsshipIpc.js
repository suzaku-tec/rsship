const { RsshipIpcToRendererArgs } = require("./rsshipIpcArgs");
const { decycle } = require('json-cyclic');

class RsshipIpcMain {
  constructor(ipcMain) {
    this._ipcMain = ipcMain;
    this._asyncActionList = [];
    this._syncActionList = [];

    ipcMain.on('async-message', (event, request) => {
      console.log("request:" + JSON.stringify(decycle(request)))
      var response = this._generateErrorResponse();
      if(request.type) {
        var eventObj = this._asyncActionList.find(asyncAction => asyncAction.type === request.type)
        if(eventObj) {
          response = eventObj.action(request.value)
        }
      }
      event.reply('async-reply', response)
    });

    ipcMain.on('sync-message', (event, request) => {
      console.log(request)
      var response = this._generateErrorResponse();
      if(request.type) {
        var action = this._syncActionList.find(syncAction => syncAction.type === request.type)
        if(action) {
          response = action.action(request.value)
        }
      }
      event.returnValue = response
    });
  }

  addAsyncAction(type, action) {
    console.log("addAsyncAction type:" + JSON.stringify(type) + " action:" + action)
    this._asyncActionList.push({type: type, action: action})
  }

  addSyncAction(type, action) {
    console.log("addSyncAction type:" + JSON.stringify(type) + " action:" + JSON.stringify(action))
    this._syncActionList.push({type: type, action: action})
  }

  _generateErrorResponse() {
    return new RsshipIpcToRendererArgs("Error", "Event not found.");
  }
}


class RsshipIpcRenderer {
  constructor(ipcRenderer) {
    this._ipcRenderer = ipcRenderer;

    ipcRenderer.on('async-reply', (event, response) => {
      // 受信時のコールバック関数
      console.log(response)
    });
  }

  /**
   * 同期メッセージの送信
   * @param {メッセージ種別} type
   * @param {メッセージ内容} value
   * @returns 実行結果
   */
   sendSync(type, value) {
    var arg = new RsshipIpcToMainArgs();
    arg.type = type
    arg.value = value
    return this._ipcRenderer.sendSync('sync-message', arg)
  }

  /**
   * 非同期メッセージの送信
   * @param {メッセージ種別} type
   * @param {メッセージ内容} value
   */
  sendAsync(type, value) {
    var arg = new RsshipIpcToMainArgs();
    arg.type = type
    arg.value = value
    this._ipcRenderer.send('async-message', arg)
  }

}

module.exports = {RsshipIpcMain, RsshipIpcRenderer}
