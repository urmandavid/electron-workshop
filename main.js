// Note the use of CommonJS require() to import modules
const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
// function for creating the main window
function createWindow() {
	// BrowserWindow is the base for our render processes
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	})
	// we go to dist/index.html, the production ready version of our
	// Vue application
	win.loadFile("dist/index.html")
}
// we can only show windows when the main application thread is ready to do so
// thus we must listen for that event.
app.whenReady().then(() => {
	createWindow()
	// If on MacOS we should open a new window if the app is activated
	// and no windows are open
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})
// quit the application when all windows are closed unless
// we are using MacOS, since that OS works a bit differently
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})
