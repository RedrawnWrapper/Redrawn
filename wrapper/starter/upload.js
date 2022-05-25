const formidable = require('formidable');
const parse = require('../data/parse');
const fUtil = require('../fileUtil');
const fs = require('fs');

module.exports = function (req, res, url) {
	if (req.method != 'POST' || url.path != '/upload_starter') return;
	new formidable.IncomingForm().parse(req, (e, f, files) => {
		const path = files.import.path, buffer = fs.readFileSync(path);
		const numId = fUtil.getNextFileId('starter-', '.xml');
		parse.unpackStarterXml(buffer, numId);
		fs.unlinkSync(path);

		res.statusCode = 302;
		const url = `https://localhost:7462/starterUploaded?returnMessage=Your Starter Has Been Uploaded. Id: s-${numId}`;
		res.setHeader('Location', url);
		res.end();
	});
	return true;
}
