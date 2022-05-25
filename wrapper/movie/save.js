const loadPost = require('../request/post_body');
const movie = require('./main');

module.exports = function (req, res, url) {
	if (req.method != 'POST' || url.path != '/goapi/saveMovie/') return;
	loadPost(req, res).then(data => {
		
		if (!data.body_zip) {
			res.statusCode = 400;
			res.end();
			return true;
		}

		const trigAutosave = data.is_triggered_by_autosave;
		if (trigAutosave && !data.movieId) { 
			return res.end('0'); 
		}

		const body = Buffer.from(data.body_zip, 'base64');
		const thumb = trigAutosave ? null : Buffer.from(data.thumbnail_large, 'base64');
		
		try {
			const mId = movie.save(body, thumb, data.movieId || data.presaveId);
			res.end('0' + mId);
		} catch (e) {
			var err = data.movieId || data.presaveId;
			console.error("Error saving movie: " + err);
		}
	});
	return true;
}
