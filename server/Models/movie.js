const mongoose = require('mongoose');
const MovieSchemas = require('../Schemas/database/movie.js')


const MovieModel = mongoose.model('Movie',MovieSchemas)

module.exports = MovieModel;