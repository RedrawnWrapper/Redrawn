function toAttrString(table) {
	return typeof table == "object"
		? Object.keys(table)
				.filter((key) => table[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
				.join("&")
		: table.replace(/"/g, '\\"');
}
function toParamString(table) {
	return Object.keys(table)
		.map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
		.join(" ");
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs)
		.map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
		.join(" ")}>${toParamString(params)}</object>`;
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var params, returnUrl, playerPath;
	switch (url.pathname) {
		case "/player": {
			params = {
				flashvars: {
					movieId: "",
				},
			};
			break;
		}

		default:
			return;
	}
	if (process.env.OFFLINE_SERVER == "Y") {
		returnUrl = "https://localhost:8043";
		playerPath = "player";
	} else {
		returnUrl = "https://josephanimate2021.github.io";
		playerPath = "lvm-static/offline-player";
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(params.flashvars, query);
	res.end(`<html>
	<head>
		<script>
			function genorateId() { 
				window.location = '${returnUrl}/${playerPath}?movieId=${params.flashvars.movieId}'; 
			}
		</script>
	</head>
	<body onload="genorateId()"></body>
</html>`)
	return true;
};
