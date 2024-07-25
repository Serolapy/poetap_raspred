const { app, BrowserWindow } = require('electron');

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
});

app.on('window-all-closed', function(){
	app.quit();
});