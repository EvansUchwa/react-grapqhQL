const mongoose = require('mongoose');
const {Schema} = mongoose



const CommentSchemas = new Schema({
	movieId: String,
	userId: String,
	text: String
},{collection: "Comments"})

module.exports = CommentSchemas;