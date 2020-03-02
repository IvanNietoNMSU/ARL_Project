const path = require("path");
const { app, BrowserWindow } = require("electron");
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1360, height: 800 });

  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
}
app.on("ready", createWindow);
