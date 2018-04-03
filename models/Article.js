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


ArticleSchema.methods.getThumbsUp = function() {
    this.thumbsUp = this.thumbsUp +1
    return this.thumbsUp;
}


ArticleSchema.methods.getThumbsDown = function() {
    this.thumbsDown = this.thumbsDown +1
    return this.thumbsDown;
}



var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;