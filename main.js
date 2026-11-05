const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');
const fs = require('fs');
const { startServer } = require('./server');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
let win = null;
let origin = '';

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
}
app.setAppUserModelId('az.englishportal.app');

async function resolveOrigin() {
  if (cfg.mode === 'local') {
    const port = await startServer(path.join(__dirname, 'site'), cfg.port || 38417);
    return 'http://127.0.0.1:' + port;
  }
  return String(cfg.url).replace(/\/$/, '');
}

function setupSession() {
  const allowed = ['media', 'notifications', 'fullscreen', 'clipboard-sanitized-write'];
  const ses = session.defaultSession;
  ses.setPermissionRequestHandler((wc, perm, cb, details) => cb(allowed.includes(perm) && String(details.requestingUrl || '').startsWith(origin)));
  ses.setPermissionCheckHandler((wc, perm, requestingOrigin) => allowed.includes(perm) && String(requestingOrigin || '').startsWith(origin));
}

function showOffline() {
  win.loadFile(path.join(__dirname, 'offline-desktop.html'), { query: { u: origin } });
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 420, minHeight: 600, show: false, autoHideMenuBar: true,
    backgroundColor: '#020617', icon: path.join(__dirname, 'icon.png'), title: 'English Portal',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(origin) || url.startsWith('blob:')) return { action: 'allow' };
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith(origin) || url.startsWith('file:')) return;
    e.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url);
  });
  win.webContents.on('did-fail-load', (e, code, desc, url, isMainFrame) => {
    if (isMainFrame && code !== -3 && !String(url).startsWith('file:')) showOffline();
  });
  win.on('closed', () => { win = null; });
  win.loadURL(origin);
}

function setupMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Tətbiq', submenu: [
      { label: 'Yenilə', accelerator: 'CmdOrCtrl+R', click: () => win && win.webContents.reload() },
      { label: 'Tam ekran', role: 'togglefullscreen' },
      { type: 'separator' },
      { label: 'Çıxış', role: 'quit' }
    ] },
    { label: 'Görünüş', submenu: [
      { label: 'Böyüt', role: 'zoomIn' }, { label: 'Kiçilt', role: 'zoomOut' }, { label: 'Normal ölçü', role: 'resetZoom' }
    ] }
  ]));
}

app.whenReady().then(async () => {
  origin = await resolveOrigin();
  setupSession();
  setupMenu();
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => app.quit());
