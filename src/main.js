const { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu, nativeImage } = require('electron');
const Store = require('electron-store');
const path = require('path');

const store = new Store();
let mainWindow;
let settingsWindow;
let tray;
let isQuitting = false;

// Create the browser window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'ClaudeDesk',
    icon: path.join(__dirname, 'assets/icons/icon.png'),
    show: false, // Start hidden
  });

  mainWindow.loadURL('https://claude.ai/chat');
  
  // Hide menu bar but keep it accessible via Alt
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  // Handle window close button
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  // Handle window blur (losing focus)
  mainWindow.on('blur', () => {
    if (!settingsWindow || !settingsWindow.isVisible()) {
      mainWindow.hide();
    }
  });
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    parent: mainWindow,
    modal: true,
    title: 'ClaudeDesk Settings'
  });

  settingsWindow.loadFile(path.join(__dirname, 'settings.html'));
  // settingsWindow.webContents.openDevTools();

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function createTray() {
  // Create tray icon
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icons/icon.png'));
  tray = new Tray(icon.resize({ width: 16, height: 16 }));

  // Create context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show/Hide Window',
      click: toggleWindow
    },
    {
      label: 'Settings',
      click: () => {
        mainWindow.show();
        createSettingsWindow();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  // Set tray properties
  tray.setToolTip('ClaudeDesk');
  tray.setContextMenu(contextMenu);

  // Handle tray click
  tray.on('click', toggleWindow);
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
}

function showWindow() {
  // Get mouse cursor position
  const cursor = require('electron').screen.getCursorScreenPoint();
  const displays = require('electron').screen.getAllDisplays();
  const displayBounds = displays.find(display => 
    cursor.x >= display.bounds.x && 
    cursor.x <= display.bounds.x + display.bounds.width &&
    cursor.y >= display.bounds.y && 
    cursor.y <= display.bounds.y + display.bounds.height
  ).bounds;

  // Position window near the tray icon or cursor
  mainWindow.setPosition(
    Math.round(displayBounds.x + (displayBounds.width - mainWindow.getBounds().width) / 2),
    Math.round(displayBounds.y + (displayBounds.height - mainWindow.getBounds().height) / 2)
  );

  mainWindow.show();
  mainWindow.focus();
}

// Register global shortcut
function registerGlobalShortcut(accelerator) {
  globalShortcut.unregisterAll();
  
  try {
    globalShortcut.register(accelerator, toggleWindow);
    store.set('shortcut', accelerator);
    return true;
  } catch (error) {
    console.error('Failed to register shortcut:', error);
    return false;
  }
}

// App event handlers
app.whenReady().then(() => {
  createMainWindow();
  createTray();
  
  // Register saved shortcut or set default
  const savedShortcut = store.get('shortcut') || 'CommandOrControl+Shift+L';
  registerGlobalShortcut(savedShortcut);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC handlers
ipcMain.on('open-settings', () => {
  createSettingsWindow();
});

ipcMain.on('close-settings', () => {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipcMain.on('update-shortcut', (event, shortcut) => {
  const success = registerGlobalShortcut(shortcut);
  event.reply('shortcut-update-status', success);
});