const express = require("express");
const Router = express.Router();
const User = require('./Models/user');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware.js')


Router.post('/auth/login',async (req,res)=>{
	const {username,password} = req.body;
	
	try{	
		const findUser = await User.findOne({username})
		const comparePwd = await bcrypt.compare(password,findUser.password);

		if(comparePwd){
			const authToken = jwt.sign({id: findUser._id},"movie-graphQl-auth")
			res.send({token: authToken})
			// return res.send('ha')
		}else{
			return res.status(400).json({message: "Mot de passe incorrecte"})
		}
		
	}catch(err){
		return res.status(400).json({message: "Pseudo ou mot de passe incorrecte"})
	}
})

Router.post('/auth/signUp',async (req,res)=>{
	const {username,password,email} = req.body;
	const hashPass = await bcrypt.hash(password,12);

	try{	
		const findUser = User.findOne({username})

		if(findUser._id){
			return res.status(400).json({message: "Un utilisateur avec ce pseudo existe deja"})
		}else{
			const newUser = new User({username,password: hashPass,email});
			 newUser.save()
			 return res.send({message: 'Yess !! Inscription validé,connecte toi pour pouvoir ajouter/commenter des films ! '})
		}
	}catch(err){
		return res.status(400).json({message: "Une erreur lors de"})
	}

})

Router.get('/auth/user',authenticateToken,async (req,res)=>{
	const {userId} = req;
	const getLoggedUser = await User.findOne({_id: userId})
	res.send(getLoggedUser)
})



Router.get('/user/all', async (req,res)=>{
	try{
		 const users = await User.find().exec();

		if(!users)
			return 'Not Users found'
		return res.send(users)
	}catch(error){	
		return 'Erreur lors de la recuperation'
	}
})

Router.get('/user/:id', async (req,res)=>{
	try{
		 const user = await User.findOne({_id: req.params.id}).exec();

		if(!user)
			return 'Not User found'
		return res.send(user)
	}catch(error){	
		console.log(error)
		return res.status(400).json({message: "Pas dutilisateur avec cet id"})
	}
})

Router.post('/user/new', (req,res)=>{
	const {email,username} = req.body;
	try{
		 const newUser = new User({email,username})
		 newUser.save()
		 .then(saved=>console.log(saved))
		 .catch(err=>console.log(err))


		// if(!users)
		// 	return 'Not Users found'
		// return res.send(users)
	}catch(error){	
		console.log(error)
		return res.status(400).json({message: "Pas dutilisateur avec cet id"})
	}
})

module.exports = Router;