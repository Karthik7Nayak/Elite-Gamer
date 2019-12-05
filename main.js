const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require("electron-updater");

Menu.setApplicationMenu(null);

let loginShown = false;
let mainWindow;
let loginWindow;

const showHomeWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.center();
  mainWindow.resizable = true;
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

}

const showLogin = () => {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 280,
    webPreferences: {
      nodeIntegration: true
    },
    parent: mainWindow
  });
  loginWindow.resizable = false;
  loginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer', 'login.html'),
    protocol: 'file:',
    slashes: true,
    frame: false
  }));
  loginWindow.on('closed', () => {
    loginShown = false;
  });
}


app.on('ready', () => {
  showHomeWindow();
  autoUpdater.setFeedURL({
    provider: 'github',
    repo: "Elite-Gamer",
    owner: "Karthik7Nayak",
    token: "807cf1b5cc9f3359975dbd8f80117bc9f7e92871"
  });
  // autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) {
    showHomeWindow();
  }
});


ipcMain.on('login-success', () => {
  loginWindow.close();
  loginShown = true;
  mainWindow.webContents.send('login-Success', '');
});

ipcMain.on('login-user', () => {
  if (loginShown === false) {
    showLogin();
    loginShown = true;

  }
});

ipcMain.on('logout-user', () => {
  loginShown = false;
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');// sending message from main process to renderer process
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  console.log('restart app');
  autoUpdater.quitAndInstall();
});


