var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var bodyParser = require('body-parser');

var Users = require('../models/user');
router.use(bodyParser.json());

router.route('/').get(Verify.verifyAdminUser, function(req, res, next){
	Users.find({}, function(err, user){
		if(err) throw err;
		
		res.json(user);
	});
});

router.post('/register', function(req, res){
	User.register(
			new User({username: req.body.username}),
			req.body.password,
			function(err, user){
				if(err) {
					return res.status(500).json({err: err});
				}
				
				passport.authenticate('local')(req, res, function(){
					return res.status(200).json({status: 'Registration Successfull'});
				});
			}
	);
});

router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){
		if (err) {
			return next(err);
		}
		
		if(!user){
			return res.status(401).json({err: info}); 
		}
		
		req.logIn(user, function(err){
			if(err){
				return res.status(500).json({
					err: 'Could not log in user',
					message: err
				});
			}
			
			console.log('User in users: ' + user);
			var token = Verify.getToken(user);
			
			if(user.admin){
				token //adicionar a informacao de que  e admin
			}
			
			res.status(200).json({
				status: 'Login successful',
				success: 'true',
				token: token
			});
		});
		
	})(req, res, next);
});

router.route('/logout').get(Verify.verifyOrdinaryUser, function(req, res){ //aqui falta destruir o token
	req.logout();
	res.status(200).json({
		status:'Bye!'
	})
})

module.exports = router;