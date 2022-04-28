const mongoose = require('mongoose');
const userSchema = require('../Schemas/database/user.js');

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;