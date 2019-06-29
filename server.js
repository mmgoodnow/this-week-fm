const express = require("express");
const enforce = require("express-sslify");
const compression = require("compression");
const path = require("path");
const backend = require("./src/backend");
const app = express();

app.use(compression());
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

// serve back end
backend(app);

// serve front end
app.use(express.static("./dist/this-week-fm"));
app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "/dist/this-week-fm/index.html"));
});

app.listen(process.env.PORT || 8080);
