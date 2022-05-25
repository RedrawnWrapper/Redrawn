module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var params, returnUrl, playerPath;
	switch (url.pathname) {
		case "/videomaker": {
			break;
		}

		default:
			return;
	}
	if (process.env.OFFLINE_SERVER == "Y") {
		returnUrl = "https://localhost:8043";
		playerPath = "themeChooser";
	} else {
		returnUrl = "https://josephanimate2021.github.io";
		playerPath = "lvm-static/themeChooser?return=http://localhost:4343/";
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	res.end(`<html>
	<head>
		<script>
			function genorateId() { 
				window.location = '${returnUrl}/${playerPath}'; 
			}
		</script>
	</head>
	<body onload="genorateId()"></body>
</html>`)
	return true;
};
