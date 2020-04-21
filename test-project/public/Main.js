const path = require("path");
// const { server } = require(`file://${path.join(__dirname, "../node/expressServer.js"));

const { app, BrowserWindow } = require("electron");
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1360,
    height: 800,
    icon: "./logo.jpg",
  });

  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  // server();
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  app.quit();
});
