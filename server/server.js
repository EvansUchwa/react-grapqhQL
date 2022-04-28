const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const Router = require('./router.js')
const authenticateToken = require('./middleware.js')
const graphQLSchema = require('./Schemas/graphQL/index')
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api',Router)

// authenticateToken
app.use('/api-graphql',expressGraphQL({
	graphiql: true,
	schema: graphQLSchema
}))

const mongo_url = process.env.MONGO_URL
mongoose.connect(mongo_url, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.once('open', () => console.log('Connecté à MongoLab'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;