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


//　npm library
const fs = require('fs');
const path = require('path');
const gridjs = require("gridjs")
const log = require('electron-log');

// original library
const feed = require("./feed");
const tab = require("./tab");

process.once('loaded', () => {
  global.feed = feed;
  global.fs = fs;
  global.path =path;
  global.Grid = gridjs.Grid;
  global.log = log;
  global.tab = tab;
});

