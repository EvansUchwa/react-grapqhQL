const mongoose = require('mongoose');
const {Schema} = mongoose;
const MovieSchemas = new Schema({
	name: String,
	description: {type: String,default: ''},
	userId: String,
	type: String
},{collection: "Movies"})

module.exports = MovieSchemas