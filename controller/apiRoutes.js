//require express & setup Router
var express = require("express");
var router = express.Router();
//Require Mongoose
var mongoose = require("mongoose");
// Require all models
var db = require("../models");

//Create Comment
router.post("/newComment", (req,res) => {
    db.Comment.create({articleID: req.body.id, body: req.body.body, created: req.body.created}).then((newComment) => {res.send("new comment added")}).catch((err) => {if (err) throw err})
});

//Get Comments
router.get("/comments/:id", (req,res) => {
    db.Comment.find({articleID: req.params.id}).sort({created: -1}).then((data) => {res.json(data)});
});

//Get thumbs up / thumbs Down
router.get("/thumbs/:id", (req,res) => {
    db.Article.find({_id: req.params.id}).then((data) => {res.json(data)});
});

//Update thumbs up number
router.put("/thumbsUp", (req,res)=> {
    db.Article.findOneAndUpdate({headline: req.body.headline}, {thumbsUp: req.body.thumbsUp}, {new:true}).then((updatedInfo) => {res.json(updatedInfo)})

});

//Update thumbs up number
router.put("/thumbsDown", (req,res)=> {
    db.Article.findOneAndUpdate({headline: req.body.headline}, {thumbsDown: req.body.thumbsDown}, {new:true}).then((updatedInfo) => {res.json(updatedInfo)})

})
module.exports = router;