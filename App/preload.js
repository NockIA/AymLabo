// preload.js
window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron');

  document.getElementById('goToPage1').addEventListener('click', () => {
      ipcRenderer.send('navigate', 'page1.html');
  });

  document.getElementById('goToPage2').addEventListener('click', () => {
      ipcRenderer.send('navigate', 'page2.html');
  });
});
