var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3000;

//setting up mongo orm
// var mongojs = require("mongojs")

// Html Parser
var cheerio = require("cheerio");
// Requests html page!
var request = require("request");




app.get("/", (req,res) => {
    var hbsObject;
// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

            var results = [];
            var results3 = [];

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.yelp.com/biz/jedis-garden-restaurant-oak-lawn", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $(".biz-rating").each(function(i, element) {

    // Save the text of the element in a "title" variable
    // var score = $(element).children(".i-stars").attr("title");
    // var review = $(element).siblings("p").text()
    // var score = $(element).has(".i-stars").text();

    // var score = $(element).children().attr("title");
    var review = $(element).siblings("p").text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    // var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
    //   score: score,
      review: review
    // contents: contents
    });
  });
  $(".i-stars").each(function(i,element) {

    var score = $(element).attr("title");
    results3.push({
        score: score,
      //   review: review
      // contents: contents
      });

  })
  var combined = {
      reviews: results,
      score: results3
  }
  hbsObject = {
    data: combined
};
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
  console.log(results3)
  res.render("index", hbsObject);
});

    
})



//Body parser setup 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve static sites from public directory
app.use(express.static("./app/public"));

//Set handle bars as view engine
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// //require routes 
// var htmlRoutes = require("./controller/htmlRoutes.js");
// var apiRoutes = require("./controller/apiRoutes.js");

// //Use routes
// app.use("/", htmlRoutes);
// // app.use("/api", apiRoutes);


//start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});