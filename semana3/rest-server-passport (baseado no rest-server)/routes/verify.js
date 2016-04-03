var User = require('../models/user');
var jwd = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user){
	return jwt.sign(user, config.secretkey, {expiresIn: 3600});
};

exports.verifyOrdinaryUser = function(req, res, next){ //para verificar que um user que manda um token está mesmo logado
	
	//verificar o header para ver se tem os parametros correctos
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//descodificar o token
	if(token){
		
		//verifica se o token está a 100%
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

exports.verifyAdminUser = function(req, res, next){ //para verificar que um user que manda um token está mesmo logado
	
	//verificar o header para ver se tem os parametros correctos
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	//descodificar o token
	if(token){
		
		//verifica se o token está a 100%
		jwt.verify(token, config.secretKey, function(err, decoded){
			if(err){
				var err = new Error('You are not authenticated!');
				err.status = 401;
				return next(err);
			} else {
				if(token.admin){ //VERIFICAR SE É ASSIM QUE SE TIRA UMA PROPRIEDADE DO TOKEN
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
