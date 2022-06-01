const { contextBridge, ipcRenderer } = require("electron")
const os = require("os")

// Adds a silly box to the HTML when the DOM has been loaded
// window.addEventListener("DOMContentLoaded", () => {
// 	const div = document.createElement("div")
// 	div.innerText = "This is the end"
// 	div.style.backgroundColor = "hotpink"
// 	div.style.position = "fixed"
// 	div.style.inset = "50% 50%"
// 	div.style.height = "2em"
// 	div.style.width = "20ch"
// 	document.body.append(div)
// })

// expose the function window.api.cpuCount()
contextBridge.exposeInMainWorld("api", {
	// Note that the os.cpus() is a Node.js method calling the OS
	cpuCount: () => os.cpus().length,
})
