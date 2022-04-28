const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	createdAt: {type: String,default: new Date()}
},{collection: "Users"});

module.exports = userSchema;