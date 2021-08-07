'use strict';

import { RsshipIpcToRendererArgs, RsshipIpcToMainArgs } from "./rsshipIpcArgs";
import { decycle } from 'json-cyclic';

export class RsshipIpcMain {
  _asyncActionList: any;
  _ipcMain: any;
  _syncActionList: any;
  constructor(ipcMain: any) {
    this._ipcMain = ipcMain;
    this._asyncActionList = [];
    this._syncActionList = [];

    ipcMain.on('async-message', (event: any, request: any) => {
      console.log("request:" + JSON.stringify(decycle(request)))
      var response = this._generateErrorResponse();
      if(request.type) {
        var eventObj = this._asyncActionList.find((asyncAction: any) => asyncAction.type === request.type)
        if(eventObj) {
          var result = eventObj.action(request.value)
          response = new RsshipIpcToRendererArgs(request.type, result)
        }
      }
      event.reply('async-reply', response)
    });

    ipcMain.on('sync-message', async(event: any, request: any) => {
      console.log(request)
      var response = this._generateErrorResponse();
      if(request.type) {
        var actionObj = this._syncActionList.find((syncAction: any) => syncAction.type === request.type)
        if(actionObj) {
          console.log("actionObj:", actionObj)
          response = actionObj.action(request.value)
        }
      }
      event.returnValue = response
    });
  }

  addAsyncAction(type: any, action: any) {
    this._asyncActionList.push({type: type, action: action})
  }

  addSyncAction(type: any, action: any) {
    this._syncActionList.push({type: type, action: action})
  }

  _generateErrorResponse() {
    return new RsshipIpcToRendererArgs("Error", "Event not found.");
  }
}


export class RsshipIpcRenderer {
  _ipcRenderer: any;
  constructor(ipcRenderer: any) {
    this._ipcRenderer = ipcRenderer;

    ipcRenderer.on('async-reply', (event: any, response: any) => {
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
  sendSync(type: any, value: any) {
   var arg = new RsshipIpcToMainArgs(type, value);
   return this._ipcRenderer.sendSync('sync-message', arg)
 }

  /**
   * 非同期メッセージの送信
   * @param {メッセージ種別} type
   * @param {メッセージ内容} value
   */
  sendAsync(type: any, value: any) {
    var arg = new RsshipIpcToMainArgs(type, value);
    this._ipcRenderer.send('async-message', arg)
  }
}

// module.exports = {RsshipIpcMain, RsshipIpcRenderer}
