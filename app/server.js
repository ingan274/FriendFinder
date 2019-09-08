// dependencies
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// connecting express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
require("./routing/api-routes")(app);
require("./routing/html-routes")(app);

// adding listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});