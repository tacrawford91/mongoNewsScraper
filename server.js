var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3000;

//setting up mongo orm
var mongoose = require("mongoose")
//connect to db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrape_db";
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Html Parser
var cheerio = require("cheerio");
// Requests html page!
var request = require("request");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Body parser setup 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve static sites from public directory
app.use(express.static("./app/public"));

//Set handle bars as view engine
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// //require routes 
var htmlRoutes = require("./controller/htmlRoutes.js");
var apiRoutes = require("./controller/apiRoutes.js");

// //Use routes
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//connect to db
mongoose.connect(MONGODB_URI, {

});

//start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});