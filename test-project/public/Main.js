const path = require("path");
// const { server } = require(`file://${path.join(
//   __dirname,
//   "../src/node/expressServer"
// )}`);
const { server } = require("../node/expressServer");
// const { server } = require(path.join(__dirname, "node", "expressServer"));

const { app, BrowserWindow } = require("electron");
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1360, height: 800 });

  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
}
app.on("ready", createWindow);
server();
app.on("window-all-closed", () => {
  app.quit();
});
