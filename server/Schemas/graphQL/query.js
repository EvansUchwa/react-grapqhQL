const graphql =  require('graphql');
const User = require('../../Models/user')
const Movie = require('../../Models/movie')
const Like = require('../../Models/like')
const Dislike = require('../../Models/dislike')
const Comment = require('../../Models/comment')


const {
	GraphQLNonNull,
	GraphQLList,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLString,
} = graphql;
const {UserType,MovieType,MovieAndReactionType,CommentType} = require('./UserAndMovieType.js')


const RootQueryType = new GraphQLObjectType({
	name: "RootQueryType",
	fields:{
		users: {
			type: GraphQLList(UserType),
			resolve(parentValue,args){
				return User.find().exec()
			}
		},
		user: {
			type: UserType,
			args: {id: {type: GraphQLString} },
			resolve(parentValue,args){
				return User.findById(args.id)
			}
		},
		movie: {
			type: MovieType,
			args: {id: {type: GraphQLString} },
			resolve(parentValue,args){
				return Movie.findById(args.id)
			}
		},
		movieAndReaction: {
			type: MovieAndReactionType,
			args: {movieId: {type: GraphQLString},userId :{type: GraphQLString} },
			async resolve(parentValue,args){
				const findMovie = await Movie.findById(args.movieId)
				return findMovie;
			}
		},
		moviesByUser: {
			type: GraphQLList(MovieType),
			args: {userId :{type: GraphQLString} },
			async resolve(parentValue,args){
				const findMovies = await Movie.find({userId: args.userId})
				return findMovies;
			}
		},
		movies : {
			type: GraphQLList(MovieType),
			resolve(parentValue,args){
				return Movie.find().exec()
			}
		},
		comments : {
			type: GraphQLList(CommentType),
			args: {movieId : {type: GraphQLString}},
			resolve(parentValue,args){
				return Comment.find({movieId: args.movieId})
			}
		}
	}
})


module.exports = RootQueryType;