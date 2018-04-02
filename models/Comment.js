var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
    body: {
        type: String,
        unique:true,
        required: true
    },
    created: String,
    created_at: Date,
    updated_at: Date,
    articleID: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;