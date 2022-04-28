const mongoose = require('mongoose');
const CommentSchemas = require('../Schemas/database/comment.js')

const CommentModel = mongoose.model("Comment",CommentSchemas);
module.exports = CommentModel; 