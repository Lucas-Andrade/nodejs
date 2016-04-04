var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
	.get(function(req, res, next){
		Leadership.find({}, function(err, promo){
			if(err) throw err;
			
			res.json(promo);
		});
	})
	.post(function(req, res, next){
		Leadership.create(req.body, function(err, promo){
			if(err) throw err;
			
			console('Promotion created!');
			var id = promo._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})
			res.end('Added the Promotion with id: ' + id);
		});
	})
	.delete(function(req, res, next){
		Leadership.remove({}, function(err, resp){ 
			if(err) throw err;
			
			console('All Promotions deleted!');
			res.json(resp);
		});
	});

promoRouter.route('/:promoId')
	.get(function(req, res, next){
		Dishes.findById(req.params.promoId, function(err, promo){
			if(err) throw err;
			
			res.json(promo);
		});
	})
	.put(function(req, res, next){
		Dishes.findByIdAndUpdate(
				req.params.promoId,  
				{$set: req.body}, 
				{new: true}, 
				function(err, promo){
					
			if(err) throw err;
			
			console('Promotion modified!');
			res.json(promo);
		});
	})
	.delete(function(req, res, next){
		Dishes.remove(req.params.promoId, function(err, promo){ 
			if(err) throw err;
			
			console('Promotion deleted!');
			res.json(promo);
		});
});

exports.router = promoRouter;
