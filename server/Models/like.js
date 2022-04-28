const mongoose = require('mongoose');
const {LikeSchema,DisLikeSchema} = require('../Schemas/database/likeAndDislike.js')

const LikeModel = mongoose.model('Like',LikeSchema);
module.exports = LikeModel
// const Dis