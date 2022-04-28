const mongoose = require('mongoose')
const {Schema} = mongoose;


const LikeSchema = new Schema({
	userId: String,
	movieId: String,
},{collection: "Likes"})

const DisLikeSchema = new Schema({
	userId: String,
	movieId: String,
},{collection: "Dislikes"})

module.exports = {LikeSchema,DisLikeSchema}