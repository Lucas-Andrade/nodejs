var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user){
	return jwt.sign(user, config.secretkey, {expiresIn: 3600});
};

exports.verifyOrdinaryUser = function(req, res, next){ //para verificar que um user que manda um token est� mesmo logado
	
	//verificar o header para ver se tem os parametros correctos
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//descodificar o token
	if(token){
		
		//verifica se o token esta 100%
		jwt.verify(token, config.secretKey, function(err, decoded){
			if(err){
				var err = new Error('You are not authenticated!');
				err.status = 401;
				return next(err);
			} else {
				req.decoded = decoded; //se estiver tudo bem passa o token descodificado para a proxima
				next();
			}
		})
	} else {
		var err = new Error('No token provided!');
		err.status = 403;
		return next(err);
	}
};

exports.verifyAdminUser = function(req, res, next){ //para verificar que um user que manda um token esta mesmo logado
	
	//verificar o header para ver se tem os parametros correctos
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//descodificar o token
	if(token){
		
		//verifica se o token est� a 100%
		jwt.verify(token, config.secretKey, function(err, decoded){
			if(err){
				var err = new Error('You are not authenticated!');
				err.status = 401;
				return next(err);
			} else {
				if(req.decoded._doc.admin){
					req.decoded = decoded; //se estiver tudo bem passa o token descodificado para a proxima
					next();
				}else{
					
				}
			}
		})
	} else {
		var err = new Error('No token provided!');
		err.status = 403;
		return next(err);
	}
};
