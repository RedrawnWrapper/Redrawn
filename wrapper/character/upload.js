const formidable = require('formidable');
const parse = require('../data/parse');
const fUtil = require('../fileUtil');
const fs = require('fs');

module.exports = function (req, res, url) {
	if (req.method != 'POST') {
		switch (url.pathname) {
			case '/upload_character': {
				new formidable.IncomingForm().parse(req, (e, f, files) => {
					const path = files.import.path, buffer = fs.readFileSync(path);
					const numId = fUtil.getNextFileId('char-', '.xml');
					parse.unpackCharXml(buffer, numId);
					fs.unlinkSync(path);
					res.statusCode = 302;
					const xml = Buffer.from(buffer);
					const tIDbeg = xml.indexOf('" theme_id="') + 12;
					const tIDend = xml.indexOf('" x="');
					const themeId = xml.subarray(tIDbeg, tIDend).toString();
					const url = `/cc?themeId=${themeId}&original_asset_id=c-${numId}`
					res.setHeader('Location', url);
					res.end();
				});
				return true;
			}
			case '/upload_character_swf': {
				new formidable.IncomingForm().parse(req, (e, f, files) => {
					const path = files.import.path, buffer = fs.readFileSync(path);
					const numId = fUtil.getNextFileId('char-', '.xml');
					parse.unpackCharXml(buffer, numId);
					fs.unlinkSync(path);
					res.statusCode = 302;
					res.end();
				});
				return true;
			}
			default: return;
		}
	}
}
