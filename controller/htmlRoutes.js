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


router.get("/", (req,res) => {
    // var hbsObject;
    var results = [];
    request("https://www.developer-tech.com/news/", (error, response, html) => {
        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(html);
        $("article").each(function(i, element) {
                var headline = $(element).children("a").children("h2").text();
                var summary = $(element).children(".image_and_summary_wrapper").text();
                var author = $(element).children(".meta_list").children("h4").text().split(",")[0];
                var date = $(element).children(".meta_list").children("h4").text().split(",")[1];
                // var image = $(element).children(".image_and_summary_wrapper").children(".thumb").children("img").attr("src");
                var link = `https://www.developer-tech.com/${$(element).children("a").attr("href")}`;
                // push to result array
                results.push({
                headline,
                summary,
                link,
                date,
                author
                });
            //     Article.find({headline: headline}, (err,data) => {
            //     if (err) throw err;
            //     console.log("I found these users:" + data.length)
            //     if (data.length === 0) {
            //         var newArticle = new Article ({
            //             headline,
            //             summary,
            //             link,
            //             date,
            //             author});
            //         newArticle.save( function(err) {
            //             if (err) throw err; 
            //             console.log(`added user`);
            //         });
            //     }  
            // });  
            // Using our Library model, "find" every library in our db
            db.Article.find({headline: headline})
                .then(function(foundArticles) {
                if (foundArticles.length === 0) {
                    db.Article.create({
                        headline,summary,link,date,author})
                    .then((createdArticle)=> {console.log(`created: ${createdArticle}`)})
                    .catch((err) => console.log(`THE IS ERROR IS THE FOLLOWING: ${err}`));
                } 
            });         
        });

        db.Article.find({})
        .then((allArticles) => {
            hbsObject = {
                data: allArticles
            };
            res.render("index", hbsObject)
        }).catch((err) => console.log(`rendering THE IS ERROR IS THE FOLLOWING: ${err}`));      
    }); 
});


module.exports = router;