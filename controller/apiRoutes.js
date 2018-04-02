//require express & setup Router
var express = require("express");
var router = express.Router();
//Require Mongoose
var mongoose = require("mongoose");
// Require all models
var db = require("../models");

router.post("/newComment", (req,res) => {
    console.log(req.body);
    db.Comment.create({articleID: req.body.id, body: req.body.body, created: req.body.created}).then((newComment) => {console.log("new comment created"); res.send("new comment added")}).catch((err) => {if (err) throw err})

})

router.get("/comments/:id", (req,res) => {
    console.log(req.params.id)
    db.Comment.find({articleID: req.params.id}).sort({created: -1}).then((data) => {console.log(`Houston we have comments: ${data}`); res.json(data)});
})

module.exports = router;