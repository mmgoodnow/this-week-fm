const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function(app) {
	app.get("/api/friends/:username", function(req, res) {
		const url = `https://www.last.fm/user/${req.params.username}/following`;
		request.get(url, (error, response, body) => {
			if (error) {
				res.status(500).json(error);
				return;
			}
			const dom = new JSDOM(body);
			const friends = [];
			dom.window.document
				.querySelector("ul.user-list")
				.querySelectorAll("a.user-list-link")
				.forEach(a => friends.push(a.innerHTML));
			res.json(friends);
		});
	});
};
