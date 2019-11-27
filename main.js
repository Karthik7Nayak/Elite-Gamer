const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require("electron-updater");



Menu.setApplicationMenu(null);
let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 280,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.resizable=false;
  mainWindow.setMenuBarVisibility(false);// setAutoHideMenuBar(hide);
  // mainWindow.loadFile(`${__dirname}/index.html`);
  mainWindow.loadURL(url.format({
    // pathname: path.join(__dirname, 'dist', 'index.html'),
    pathname: path.join(__dirname, 'renderer', 'login.html'),
    protocol: 'file:',
    slashes: true
  }));

  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

};
const showHomeWindow = () => {
  mainWindow.setSize(1200,700);
  mainWindow.center();
  mainWindow.resizable=true;
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
    
  }));

  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // mainWindow.
}


app.on('ready', () => {
  createWindow();
  // autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});


ipcMain.on('login-success', () => {
  showHomeWindow();

  // mainWindow.close();
})