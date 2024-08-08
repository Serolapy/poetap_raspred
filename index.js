const { app, BrowserWindow } = require('electron');
const calculator = require('./calculator.js');

for (let i = 0; i < process.argv.length; i++){
	if (process.argv[i] == 'dev'){
		global.DEBUG = true;
	}
}
if (!global.DEBUG){
	global.DEBUG = false;
}

app.on('ready', function (){
	const win = new BrowserWindow ({
		minWidth: 800,
		minHeight: 600,
		webPreferences: {
     		contextIsolation: false,
     		nodeIntegration: true
    	},
		autoHideMenuBar: true, //скрыть меню
		center: true, //по центру
		simpleFullscreen: true,
	});
	win.loadFile('index.html');
	
	if (DEBUG) win.webContents.openDevTools();
});

app.on('window-all-closed', function(){
	app.quit();
});

calculator(10000, 1, '0.6*x*x', '0.5*x', '0.7*x', '0.8*x');