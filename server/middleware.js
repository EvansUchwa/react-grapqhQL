const jwt = require('jsonwebtoken');


const authenticateToken = (req,res,next)=>{
	if(req.headers['authorization']){
		const token = req.headers['authorization'].split('Bearer ')[1]

		if(token){
			const checkToken = jwt.verify(token,"movie-graphQl-auth")
			if(checkToken){
				req.userId = checkToken.id
				next();
			}else{
				return res.status(404).send({message: "Token invalide"})
			}
			
		}else{
			return res.status(404).send({message: "Pas de token donc pas le droit"})
		}
		
	}else{
		return res.status(404).send({message: "Pas le droit"})
	}

}

module.exports  = authenticateToken