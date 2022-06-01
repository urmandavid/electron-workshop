// Note the use of CommonJS require() to import modules
const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

// require the promise based version of fs functions
const fs = require("fs/promises")

// we want this to be as async as possible!
async function saveFile(browserWin, todos) {
	let { canceled, filePath } = await dialog.showSaveDialog(browserWin, {
		filters: [
			{ name: "JSON", extensions: ["json"] },
			{ name: "All Files", extensions: ["*"] },
		],
	})

	if (!canceled) {
		const content = JSON.stringify(todos)
		fs.writeFile(filePath, content)
	}
}

async function openFile(browserWin) {
	let { canceled, filePaths } = await dialog.showOpenDialog(browserWin, {
		filters: [
			{ name: "JSON", extensions: ["json"] },
			{ name: "All Files", extensions: ["*"] },
		],
	})
	if (!canceled && filePaths?.length > 0) {
		return fs.readFile(filePaths[0], "utf-8")
	}
}

// function for creating the main window
function createWindow() {
	// BrowserWindow is the base for our render processes
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	})

	//DevTools for Electron
	//add an "if" for opening DevTools
	//win.webContents.openDevTools()

	// we go to dist/index.html, the production ready version of our
	// Vue application
	win.loadFile("dist/index.html")
	return win
}

// we can only show windows when the main application thread is ready to do so
// thus we must listen for that event.
app.whenReady().then(() => {
	const mainWin = createWindow()

	// when we get sent a message on the channel "saveFile" we
	// call the saveToFile function
	ipcMain.handle("saveFile", (event, todos) => saveFile(mainWin, todos))
	ipcMain.handle("openFile", () => openFile(mainWin))

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
