const starter = require('./main');

module.exports = function (url) {
	switch (url.path) {
		case '/goapi/deleteUserTemplate/': { 
			starter.delete(); 
			starter.deleteThumb();
			break; 
		}
		default: return;
	}
}
