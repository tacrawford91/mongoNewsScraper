var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema
var ArticleSchema = new Schema({
    headline: {
        type:String,
        required:true,
        unique:true
    },
    date: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    summary: {
        type:String,
        required:true
    },
    link: {
        type:String,
        required:true
    },
    thumbsUp:{
        type: Number,
        default: 0
    },
    thumbsDown:{
        type: Number,
        default: 0
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      },
    created_at: Date,
    updated_at: Date
});


var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;