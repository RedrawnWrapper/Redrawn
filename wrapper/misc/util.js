module.exports = {
	xmlFail(message = "There's a voice error!.") {
		return `<error><code>ERR_ASSET_404</code><message>${message}</message><text></text></error>`;
	},
};
