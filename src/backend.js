const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function(app) {
	app.get("/api/friends/:username", function(req, res) {
		const url = `https://www.last.fm/user/${req.params.username}/following`;
		request
			.get(url, (error, response, body) => {
				if (error) {
					res.status(500).json(error);
					return;
				}
				if (response && response.statusCode === 404) {
					res.status(404).send("Username not found");
					return;
				}

				const dom = new JSDOM(body);
				const friends = [];
				dom.window.document
					.querySelectorAll("ul.user-list a.user-list-link")
					.forEach(a => friends.push(a.innerHTML));
				res.json(friends);
			})
			.on("error", e => {
				res.status(500).json(e);
			});
	});
};
