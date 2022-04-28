const graphql =  require('graphql');
const {	GraphQLSchema } =graphql;
const RootQueryType = require('./query.js');
const MutationType = require('./mutation.js');

module.exports = new GraphQLSchema({
	query: RootQueryType,
	mutation: MutationType
})
