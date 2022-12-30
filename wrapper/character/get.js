module.exports = async function (req, res, url) {
	if (req.method != "POST" || url.pathname != "/goapi/getCharacter") return;
	var data = "";
  res.on("data", function(chunk) {
    data += chunk;
    console.log(chunk);
  });
  res.on("end, function() {
    console.log(req.data);
    console.log(data);
  });
}
