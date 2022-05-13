const movie = require('./main');
const base = Buffer.alloc(1, 0);

module.exports = function (req, res, url) {
	switch (req.method) {
		case 'GET': {
			const match = req.url.match(/\/movies\/([^.]+)(?:\.(zip|xml))?$/);
			if (!match) return;

			var id = match[1], ext = match[2];
			switch (ext) {
				case 'zip':
					console.log(`Fetching Movie Zip: ${id}`);
					res.setHeader('Content-Type', 'application/zip');
					movie.loadZip(id).then(v => { res.statusCode = 200, res.end(v) })
						.catch(e => { console.log(`Error Fetching Movie Zip: ${id}`); })
					break;
				default:
					console.log(`Fetching Movie Xml: ${id}`);
					res.setHeader('Content-Type', 'text/xml');
					movie.loadXml(id).then(v => { res.statusCode = 200, res.end(v) })
						.catch(e => { console.log(`Error Fetching Movie Xml: ${id}`); })
			}
			return true;
		}

		case 'POST': {
			var movieId;
			switch (url.pathname) {
				case '/goapi/getMovie/': {
					movieId = url.query.movieId;
					console.log(`Loading Movie: ${movieId}`);
					res.setHeader('Content-Type', 'application/zip');
					process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

					movie.loadZip(movieId).then(b =>
				                res.end(Buffer.concat([base, b]))).catch(e => { console.log(`Error Loading Movie: ${movieId}`); });
					return true;
				}
				case '/ajax/deleteMovie/': {
					movieId = url.query.movieId;
					console.log(`Deleting Movie: ${movieId}`);
					res.setHeader('Content-Type', 'application/zip');
					process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
					
					movie.delete(movieId).catch(e => { console.log(`Error Deleting Movie: ${movieId}`); });
                                        movie.deleteThumb(movieId).catch(e => { console.log(`Error Deleting Movie Thumb: ${movieId}`); }); 
					return true;
				}
			}
		}
		default: return;
	}
}
