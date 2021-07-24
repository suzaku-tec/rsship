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

"use strict";

//　npm library
import * as fs from "fs";
import * as path from "path";
import * as gridjs from "gridjs";
import * as log from "electron-log";
import { ipcRenderer } from "electron";

// original library
import Feed from "./feed";
import RsshipTab from "./RsshipTab";
import { RsshipIpcToMainArgs, RsshipIpcToRendererArgs } from "./rsshipIpcArgs";
import RssIpcEvent from "./rsshipIpcEvent";
import RsshipOpenDialog from "./rsshipOpenDialog";

import { RsshipIpcRenderer } from "./rsshipIpc";
import RsshipModal from "./rsshipModal";

import Store from "electron-store";

import RsshipSettings from "./rsshipSettings";

const rsshipIpcRenderer = new RsshipIpcRenderer(ipcRenderer);

console.log("RsshipModal:", RsshipModal)
var rsshipModal = new RsshipModal(rsshipIpcRenderer)

process.once("loaded", () => {
  (global as any).feed = Feed;
  (global as any).fs = fs;
  (global as any).path = path;
  global.grid = gridjs.Grid;
  (global as any).log = log;
  (global as any).RsshipTab = RsshipTab;

  (global as any).native = {
    ipcRenderer: ipcRenderer,
    rsshipIpcRenderer: rsshipIpcRenderer,
    RsshipIpcToMainArgs: RsshipIpcToMainArgs,
    RsshipIpcToRendererArgs: RsshipIpcToRendererArgs,
    RssIpcEvent: RssIpcEvent,
    RsshipOpenDialog: RsshipOpenDialog,
    rsshipModal: rsshipModal,
    Store: Store,
    RsshipSettings: RsshipSettings,
  };
  (window as any).global = window;
});
