/**
 * route
 * movie metadata
 */
// stuff
const Movie = require("./main");

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = async function (req, res, url) {
	switch (req.method) {
		case "GET": {
			if (!url.path.startsWith("/meta")) return;

			Movie.meta(url.path.substr(url.path.lastIndexOf("/") + 1)).then(v => res.end(JSON.stringify(v))).catch(e => {
				res.statusCode = 404;
				console.log(e);
				res.end();
			});
			return true;
		} case "POST": {
			switch (url.pathname) {
				case "/ajax/closeBrowser": {
					if (!url.query.movieId) {
						res.statusCode = 302;
						res.setHeader("Location", "/closeBrowser");
						res.end();
					} else {
						res.statusCode = 302;
						res.setHeader("Location", "/");
						res.end();
					}
					return true;
				}
			}
		}
	}
}