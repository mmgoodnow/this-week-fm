const express = require("express");
const enforce = require("express-sslify");
const path = require("path");
const app = express();

// serve front end
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static("./dist/this-week-fm"));

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "/dist/this-week-fm/index.html"));
});

app.listen(process.env.PORT || 8080);
