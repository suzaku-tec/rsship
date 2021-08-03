import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { RsshipIpcToRendererArgs } from "./rsshipIpcArgs";
import { RsshipIpcMain } from "./rsshipIpc";
import RsshipOpenDialog from "./rsshipOpenDialog";
const rsshipOpenDialog = new RsshipOpenDialog();

import ElectronStore from "electron-store";
const config = new ElectronStore({
  cwd: __dirname,
  name: "../config",
  fileExtension: 'json'
})

ElectronStore.initRenderer();

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 960,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('static/design/index.html')

  mainWindow.setMenuBarVisibility(false)

  // 開発者モードなら、開発者ツールを初期で表示する
  if( config.has('mode') &&  config.get('mode') === "dev"){
    mainWindow.webContents.openDevTools()
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var rsshipIpcMain = new RsshipIpcMain(ipcMain);
rsshipIpcMain.addAsyncAction("test", (value: any) => {
  console.log("rsshipIpcMain value:" + value)
  return new RsshipIpcToRendererArgs("test", "pong")
});

rsshipIpcMain.addSyncAction("test", (value: any) => {
  console.log("rsshipIpcMain value:" + value)
  return new RsshipIpcToRendererArgs("test", "pong")
});

rsshipIpcMain.addSyncAction(RsshipOpenDialog.MessageType, rsshipOpenDialog.mainProcAction)
