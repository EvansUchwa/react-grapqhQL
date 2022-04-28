const graphql =  require('graphql');
const User = require('../../Models/user')
const Like = require('../../Models/like')
const Dislike = require('../../Models/dislike')

const {
	GraphQLNonNull,
	GraphQLList,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLSchema
} = graphql;


const UserType =new GraphQLObjectType({
	name: "UserType",
	fields:{
		_id: {type: GraphQLString},
		username : {type: GraphQLString},
		email : {type: GraphQLString},
		createdAt : {type: GraphQLString}
	}
});


const CommentType = new GraphQLObjectType({
	name: "CommentType",
	fields:()=>(
		{
		_id: {type: GraphQLString},
		userId: {type: GraphQLString},
		movieId: {type: GraphQLString},
		text: {type: GraphQLString},
		user : {
			type: UserType,
			resolve(parentValue,args){
				return User.findOne({_id: parentValue.userId})
			}
		}
	}
		)
})

const LikeType = new GraphQLObjectType({
	name: "LikeType",
	fields:{
		_id: {type: GraphQLString},
		userId: {type: GraphQLString},
		movieId: {type: GraphQLString}
	}
})

const DislikeType = new GraphQLObjectType({
	name: "DislikeType",
	fields:{
		_id: {type: GraphQLString},
		userId: {type: GraphQLString},
		movieId : {type: GraphQLString}
	}
})

const MovieType = new GraphQLObjectType({
	name: "MovieType",
	fields: ()=>(
		{
			_id: {type: GraphQLString},
			name: {type: GraphQLString},
			description: {type: GraphQLString},
			type: {type: GraphQLString},
			userId : {type: GraphQLString},
			likeCount: {
				type: GraphQLInt,
				 async resolve(parentValue,args){
				 	const count = await Like.find({movieId: parentValue._id})
					return count.length
				}
			},
			dislikeCount: {
				type: GraphQLInt,
				 async resolve(parentValue,args){
				 	const count = await Dislike.find({movieId: parentValue._id})
					return count.length
				}
			},
		}
	)
});

const MovieAndReactionType = new GraphQLObjectType({
	name: "MovieAndReactionType",
	fields: ()=>(
		{
			_id: {type: GraphQLString},
			name: {type: GraphQLString},
			description: {type: GraphQLString},
			type: {type: GraphQLString},
			userId : {type: GraphQLString},
			likeCount: {
				type: GraphQLInt,
				 async resolve(parentValue,args){
				 	const count = await Like.find({movieId: parentValue._id})
					return count.length
				}
			},
			dislikeCount: {
				type: GraphQLInt,
				 async resolve(parentValue,args){
				 	const count = await Dislike.find({movieId: parentValue._id})
					return count.length
				}
			},
			like: {
				type: GraphQLBoolean,
				args: {userId: {type: GraphQLString}},
				async resolve(parentValue,args){
				 	const userLiked = await Like.findOne({movieId: parentValue._id,userId: args.userId})
					if(userLiked){
						return true
					}
					return false
				}
			},
			dislike: {
				type: GraphQLBoolean,
				args: {userId: {type: GraphQLString}},
				async resolve(parentValue,args){
				 	const userDisliked = await Dislike.findOne({movieId: parentValue._id,userId: args.userId})
					if(userDisliked){
						return true
					}
					return false
				}
			},
			autor: {
				type: UserType,
				async resolve(parentValue,args){
				 	const autor = await User.findById(parentValue.userId)
					return autor
				}
			}
		}
	)
});

module.exports = {UserType,MovieType,MovieAndReactionType,CommentType,LikeType,DislikeType};