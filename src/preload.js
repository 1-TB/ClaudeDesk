const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();

contextBridge.exposeInMainWorld('electronAPI', {
  openSettings: () => ipcRenderer.send('open-settings'),
  closeSettings: () => ipcRenderer.send('close-settings'),
  updateShortcut: (shortcut) => ipcRenderer.send('update-shortcut', shortcut),
  onShortcutStatus: (callback) => {
    ipcRenderer.on('shortcut-update-status', (event, success) => callback(event, success));
    return () => {
      ipcRenderer.removeListener('shortcut-update-status', callback);
    };
  },
  getShortcut: () => store.get('shortcut')
});