const mongoose = require('mongoose');
const {LikeSchema,DisLikeSchema} = require('../Schemas/database/likeAndDislike.js')

const DisLikeModel = mongoose.model('Dislike',DisLikeSchema);

module.exports = DisLikeModel
// const Dis