var path = require("path");

module.exports = function (app) {
    // app.get to connect to home page
    app.get("/", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // app.get to connect to survey page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}
