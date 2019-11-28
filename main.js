const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require("electron-updater");

let loginShown = false;

Menu.setApplicationMenu(null);
let mainWindow;
let loginWindow;
/*const createWindow =  () => {
  // console.log(localStorage);
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
console.log('version changes');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

};*/
const showHomeWindow = () => {
  // mainWindow.setSize(1200,700);
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.center();
  mainWindow.resizable = true;
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,

  }));
  console.log('version changes 0.0.3');


  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // mainWindow.
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
  loginWindow.setMenuBarVisibility(false);// setAutoHideMenuBar(hide);
  // mainWindow.loadFile(`${__dirname}/index.html`);

  loginWindow.loadURL(url.format({
    // pathname: path.join(__dirname, 'dist', 'index.html'),
    pathname: path.join(__dirname, 'renderer', 'login.html'),
    protocol: 'file:',
    slashes: true,
    frame: false
  }));
}


app.on('ready', () => {
  // createWindow();
  showHomeWindow();
  autoUpdater.setFeedURL({
    provider: 'github',
    repo: "Elite-Gamer",
    owner: "Karthik7Nayak",
    token: "7dcbab2396391c09e08e95f13285c5a00877b744"
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
    // createWindow();
    showHomeWindow();
  }
});


ipcMain.on('login-success', () => {
  loginWindow.close();
  loginShown = true;
  mainWindow.webContents.send('login-Success', '');

})

ipcMain.on('login-user', () => {
  console.log('login');
  if (loginShown === false) {
      showLogin();
    console.log('after login')
  }
})

ipcMain.on('logout-user', () => {
  console.log('logout');

  loginShown = false;


})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  console.log('restart app');
  autoUpdater.quitAndInstall();
});


