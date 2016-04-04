var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
	.get(function(req, res, next){
		Leadership.find({}, function(err, leader){
			if(err) throw err;
			
			res.json(leader);
		});
	})
	.post(function(req, res, next){
		Leadership.create(req.body, function(err, leader){
			if(err) throw err;
			
			console('Leader created!');
			var id = leader._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})
			res.end('Added the Leader with id: ' + id);
		});
	})
	.delete(function(req, res, next){
		Leadership.remove({}, function(err, resp){ 
			if(err) throw err;
			
			console('All Promotions deleted!');
			res.json(resp);
		});
	});

leaderRouter.route('/:leaderId')
	.get(function(req, res, next){
		Leadership.findById(req.params.leaderId, function(err, leader){
			if(err) throw err;
			
			res.json(leader);
		});
	})
	.put(function(req, res, next){
		Leadership.findByIdAndUpdate(
				req.params.leaderId,  
				{$set: req.body},
				{new: true}, 
				function(err, leader){
					
			if(err) throw err;
			
			console('Leader modified!');
			res.json(leader);
		});
	})
	.delete(function(req, res, next){
		Leadership.remove(req.params.leaderId, function(err, resp){ 
			if(err) throw err;
			
			console('Leader deleted!');
			res.json(resp);
		});
});

exports.router = leaderRouter;
