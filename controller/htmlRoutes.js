//require express & setup Router
var express = require("express");
var router = express.Router();







router.get("/", (req,res) => {
    var hbsObject = {
        name: "test",
        check: "1-2"
    };
    res.render("index", hbsObject);
})

module.exports = router;