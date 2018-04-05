//require express & setup Router
var express = require("express");
var router = express.Router();

//require article
// var Article = require("../models/article.js")

// Html Parser
var cheerio = require("cheerio");
// Requests html page!
var request = require("request");
//Require Mongoose
var mongoose = require("mongoose");
// Require all models
var db = require("../models");

//scrape route. once scrape is complete, redirect to home route
router.get("/", (req,res) => {
    request("https://www.developer-tech.com/news/", (error, response, html) => {
        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(html);
        $("article").each(function(i, element) {
                var headline = $(element).children("a").children("h2").text();
                var summary = $(element).children(".image_and_summary_wrapper").text();
                var author = $(element).children(".meta_list").children("h4").text().split(",")[0];
                var date = $(element).children(".meta_list").children("h4").text().split(",")[1]; 
                var day = date.substring(1,3);
                var month = date.substring(4, date.length-5);
                var year = date.substring(date.length-4,date.length)
                // var image = $(element).children(".image_and_summary_wrapper").children(".thumb").children("img").attr("src");
                var sortDate = Date.parse(`${month}-${day}-${year}`)
                var link = `https://www.developer-tech.com/${$(element).children("a").attr("href")}`;
            db.Article.find({headline: headline})
                .then(function(foundArticles) {
                if (foundArticles.length === 0) {
                    db.Article.create({
                        headline,summary,link,date,author,sortDate})
                    .then((createdArticle)=> {console.log(`created: ${createdArticle}`)})
                    .catch((err) => console.log(`THE IS ERROR IS THE FOLLOWING: ${err}`));
                } 
            });         
        });     
    res.redirect("/home");
    }); 
});

router.get("/home", (req,res) => {
    var hbsObject;
    db.Article.find({}).sort({sortDate: -1})
    .then((allArticles) => {
        hbsObject = {
            data: allArticles
        };
    }).then( () => {res.render("index", hbsObject)}).catch((err) => console.log(`rendering THE IS ERROR IS THE FOLLOWING: ${err}`));      
 }); 

    module.exports = router;