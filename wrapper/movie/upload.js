const formidable = require('formidable');
const parse = require('../data/parse');
const fUtil = require('../fileUtil');
const fs = require('fs');

module.exports = function (req, res, url, window) {
	if (req.method != 'POST') {
		switch (url.pathname) {
			case '/upload_movie': {
				new formidable.IncomingForm().parse(req, (e, f, files) => {
					const path = files.import.path, buffer = fs.readFileSync(path);
					const numId = fUtil.getNextFileId('movie-', '.xml');
					parse.unpackXml(buffer, numId);
					fs.unlinkSync(path);

					res.statusCode = 302;
					const url = `/go_full?movieId=m-${numId}`;
					res.setHeader('Location', url);
					res.end();
				});
				return true;
			}
			case '/upload_movie_swf': {
				new formidable.IncomingForm().parse(req, (e, f, files) => {
					const path = files.import.path, buffer = fs.readFileSync(path);
					const numId = fUtil.getNextFileId('movie-', '.xml');
					parse.unpackXml(buffer, numId);
					fs.unlinkSync(path);

					res.statusCode = 302;
					window.alert(`Your Movie Has Been Uploaded. Id: m-${numId}`);
					res.end();
				});
				return true;
			}
			default: return;
		}
	}
}
