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
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
const gridjs = require("gridjs")
const log = require('electron-log');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipcRendere... Remove this comment to see the full error message
const { ipcRenderer } = require('electron');
// original library
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'feed'.
const feed = require("./feed");
const tab = require("./tab");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipIpcT... Remove this comment to see the full error message
const { RsshipIpcToMainArgs, RsshipIpcToRendererArgs } = require("./rsshipIpcArgs")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RssIpcEven... Remove this comment to see the full error message
const RssIpcEvent =  require("./rsshipIpcEvent")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipOpen... Remove this comment to see the full error message
const RsshipOpenDialog = require("./rsshipOpenDialog")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipIpcM... Remove this comment to see the full error message
const { RsshipIpcMain, RsshipIpcRenderer } = require("./rsshipIpc")

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipModa... Remove this comment to see the full error message
const { RsshipModal } = require("./rsshipModal")

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Store'.
const Store = require('electron-store');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipSett... Remove this comment to see the full error message
const RsshipSettings = require("./rsshipSettings")

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'rsshipIpcR... Remove this comment to see the full error message
const rsshipIpcRenderer = new RsshipIpcRenderer(ipcRenderer)

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
process.once('loaded', () => {
  (global as any).feed = feed;
  (global as any).fs = fs;
  (global as any).path = path;
  // @ts-expect-error ts-migrate(2551) FIXME: Property 'Grid' does not exist on type 'Global & t... Remove this comment to see the full error message
  global.Grid = gridjs.Grid;
  (global as any).log = log;
  (global as any).tab = tab;

  (global as any).native = {
    ipcRenderer: ipcRenderer,
    rsshipIpcRenderer: rsshipIpcRenderer,
    RsshipIpcToMainArgs: RsshipIpcToMainArgs,
    RsshipIpcToRendererArgs: RsshipIpcToRendererArgs,
    RssIpcEvent: RssIpcEvent,
    RsshipOpenDialog: RsshipOpenDialog,
    rsshipModal: new RsshipModal(rsshipIpcRenderer),
    Store: Store,
    RsshipSettings: RsshipSettings,
};
});
