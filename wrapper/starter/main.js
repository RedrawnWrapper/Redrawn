const caché = require('../data/caché');
const parse = require('../data/parse');
const fUtil = require('../fileUtil');
const nodezip = require('node-zip');
const fs = require('fs');
const { timeLog } = require('console');

module.exports = {
	/**
	 *
	 * @param {Buffer} movieZip
	 * @param {string} nëwId
	 * @param {string} oldId
	 * @returns {Promise<string>}
	 */
	save(starterZip, thumb) {
		return new Promise((res, rej) => {
			const zip = nodezip.unzip(starterZip);
			var sId = fUtil.getNextFileId('starter-', '.xml');
			let path = fUtil.getFileIndex('starter-', '.xml', sId);
			const thumbFile = fUtil.getFileIndex('starter-', '.png', sId);
			fs.writeFileSync(thumbFile, thumb);
			let writeStream = fs.createWriteStream(path);
			parse.unpackZip(zip, thumb).then(data => {
				writeStream.write(data, () => {
					writeStream.close();
					res('0-' + sId);
				});
			});
                });
	},
	delete() {
		return new Promise(async (res, rej) => {
			var starterId = fUtil.getValidFileIndicies('starter-', '.xml');
			var starterPath = fUtil.getFileIndex('starter-', '.xml', starterId);
			fs.unlinkSync(starterPath);
			res('0-' + starterId);
			
		});
	},
	deleteThumb() {
		return new Promise(async (res, rej) => {
			var starterId = fUtil.getValidFileIndicies('starter-', '.png');
			var starterPath = fUtil.getFileIndex('starter-', '.png', starterId);
			fs.unlinkSync(starterPath);
			res('0-' + starterId);
			
		});
	},
	/* if i am able to make the meta for starters.
	update() {
		return new Promise(async (res, rej) => {
			var starterId = fUtil.getValidFileIndicies('starter-', '.xml');
			var starterPath = fUtil.getFileIndex('starter-', '.xml', starterId);
			fs.renameSync(starterPath);
			res('0-' + starterId);
			
		});
	},
	*/
	thumb(movieId) {
		return new Promise((res, rej) => {
			if (!movieId.startsWith('0-')) return;
			const n = Number.parseInt(movieId.substr(2));
			const fn = fUtil.getFileIndex('starter-', '.png', n);
			isNaN(n) ? rej() : res(fs.readFileSync(fn));
		});
	},
	list() {
		const table = [];
		var ids = fUtil.getValidFileIndicies('starter-', '.xml');
		for (const i in ids) {
			var id = `0-${ids[i]}`;
			table.unshift({ id: id });
		}
		return table;
	},
}
