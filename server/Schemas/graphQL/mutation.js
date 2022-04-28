const graphql =  require('graphql');
const User = require('../../Models/user')
const Movie = require('../../Models/movie')
const Comment = require('../../Models/comment')
const Like = require('../../Models/like')
const Dislike = require('../../Models/dislike.js')


const uniqid = require('uniqid')

const {
	GraphQLNonNull,
	GraphQLList,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString
} = graphql;
const {UserType, MovieType, CommentType, LikeType, DislikeType} = require('./UserAndMovieType.js')

const MutationType =  new GraphQLObjectType({
	name: "MutationType",
	fields:{
		addUser: {
			type: UserType,
			args: {username: {type: GraphQLString},email: {type: GraphQLString}},
			resolve(parentValue,args){
				const {email,username} = args;
				const newUser = new User({username,email})
				return newUser.save()
			}
		},
		updateUser: {
			type: UserType,
			args: {userId: {type: GraphQLString},username: {type: GraphQLString},email: {type: GraphQLString}},
			async resolve(parentValue,args){
				const {userId,email,username} = args;
				return await User.findOneAndUpdate({_id: userId},{username,email});
			}
		},
		addMovie:{
			type: MovieType,
			args:{
				name: {type: GraphQLString},
				description:  {type: GraphQLString},
				userId : {type: GraphQLString},
				type: {type: GraphQLString}
			},
			resolve(parentValue,args){
				const {name,userId,description,type} = args;
				const newMovie = new Movie({name,userId,description,type})
				return newMovie.save()
			}
		},
		updateMovie: {
			type: MovieType,
			args: {movieId :{type: GraphQLString},name: {type: GraphQLString},description: {type: GraphQLString},
			type: {type: GraphQLString} },
			async resolve(parentValue,args){
				const {movieId,name,description,type} =args;
				return await Movie.findOneAndUpdate({_id: movieId},{$set: {name,description,type}})
				// return await Movie.deleteOne({_id: args.movieId});
			}
		},
		deleteMovie: {
			type: MovieType,
			args: {movieId :{type: GraphQLString} },
			async resolve(parentValue,args){
				return await Movie.deleteOne({_id: args.movieId});
			}
		},
		addComment:{
			type: CommentType,
			args:{
				movieId: {type: GraphQLString},
				userId: {type: GraphQLString},
				text: {type: GraphQLString}
			},
			resolve(parentValue,args){
				const {movieId,userId,text} = args;
				const newComment = new Comment({text,userId,movieId})
					return newComment.save()

			}
		},
		addLike:{
			type: LikeType,
			args: {movieId: {type: GraphQLString},userId:{type: GraphQLString}},
			async resolve  (parentValues,args){
				const {userId,movieId} = args;
				const newLike = new Like({userId,movieId});
				const disLikeExist = await Dislike.findOne({userId,movieId})
				
				if(disLikeExist){
					await Dislike.deleteOne({userId,movieId})
					return newLike.save()
				}else{
					const likeExist = await Like.findOne({userId,movieId})
					if(!likeExist){
					return newLike.save()
					}
					return await Like.deleteOne({userId,movieId});
				}
				
			}
		},
		addDislike:{
			type: LikeType,
			args: {movieId: {type: GraphQLString},userId:{type: GraphQLString}},
			async resolve(parentValues,args){
				const {userId,movieId} = args;
				const newDislike = new Dislike({userId,movieId});
				const likeExist = await Like.findOne({userId,movieId})
				if(likeExist){
					await Like.deleteOne({userId,movieId})
					return newDislike.save()
				}else{
					const disLikeExist = await Dislike.findOne({userId,movieId})
					if(!disLikeExist){
						return newDislike.save()
					}
					return await Dislike.deleteOne({userId,movieId});
				}
			}
		}
	}
})

module.exports = MutationType;