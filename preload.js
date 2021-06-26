// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

'use strict';

//　npm library
const fs = require('fs');
const path = require('path');
const gridjs = require("gridjs")
const log = require('electron-log');

const { ipcRenderer } = require('electron');
// original library
const feed = require("./feed");
const tab = require("./tab");
const { RsshipIpcToMainArgs, RsshipIpcToRendererArgs } = require("./rsshipIpcArgs")
const RssIpcEvent =  require("./rsshipIpcEvent")
const RsshipOpenDialog = require("./rsshipOpenDialog")
const { RsshipIpcMain, RsshipIpcRenderer } = require("./rsshipIpc")

const { RsshipModal } = require("./rsshipModal")

process.once('loaded', () => {
  global.feed = feed;
  global.fs = fs;
  global.path =path;
  global.Grid = gridjs.Grid;
  global.log = log;
  global.tab = tab;

  global.native = {
    ipcRenderer: ipcRenderer,
    rsshipIpcRenderer: new RsshipIpcRenderer(ipcRenderer),
    RsshipIpcToMainArgs: RsshipIpcToMainArgs,
    RsshipIpcToRendererArgs: RsshipIpcToRendererArgs,
    RssIpcEvent: RssIpcEvent,

    RsshipOpenDialog: RsshipOpenDialog,
    rsshipModal: new RsshipModal()
  };
});
