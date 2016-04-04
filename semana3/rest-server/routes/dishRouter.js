var express = require('express');
var bodyParser = require('body-parser');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.get(function(req, res, next){
		Dishes.find({}, function(err, dish){
			if(err) throw err;
			
			res.json(dish);
		});
	})
	.post(function(req, res, next){
		Dishes.create(req.body, function(err, dish){
			if(err) throw err;
			
			console('Dish created!');
			var id = dish._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})
			res.end('Added the dish with id: ' + id);
		});
		
	})
	.delete(function(req, res, next){
		Dishes.remove({}, function(err, resp){ //resp é porque a base de dados te envia o que é que apagou. estamos a passar isso ao cliente
			if(err) throw err;
			
			console('All dishes deleted!');
			res.json(resp);
		});
	});

dishRouter.route('/:dishId')
	.get(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;
			
			res.json(dish);
		});
	})
	.put(function(req, res, next){
		Dishes.findByIdAndUpdate(
				req.params.dishId,  //qual é o item a alterar
				{$set: req.body}, //quais propriedades serao alteradas
				{new: true}, //true significa que apos a operacao, a base de dados nos retorna o item depois de ser actualizado
				function(err, dish){
					
			if(err) throw err;
			
			console('Dish modified!');
			res.json(dish);
		});
	})
	.delete(function(req, res, next){
		Dishes.remove(req.params.dishId, function(err, resp){ 
			if(err) throw err;
			
			console('Dish deleted!');
			res.json(resp);
		});
	});

dishRouter.route('/:dishId/comments')
	.get(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;
			
			res.json(dish.comments);
		});
	})
	.post(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;
			
			dish.comments.push(req.body);
			dish.save(function(err, dish){
				if(err) throw err;
				console.log('Updated comments');
				res.json(dish);
			});
		});
	})
	.delete(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;
			
			for(var i = (dish.comments.length -1); i >= 0; i--){
				dish.comments.id(dish.comments[i]._id).remove();
			}
			
			dish.save(function(err, result){
				if(err) throw err;
				
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				res.end('Deleted all comments!');
			});
		});
	});

dishRouter.route('/:dishId/comments/:commentId')
.get(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		
		res.json(dish.comments.id(req.params.commentId));
	});
})
.put(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		
		dish.comments.id(req.params.commentId).remove();
		dish.comments.push(req.body);
		
		dish.save(function(err, dish){
			if(err) throw err;
			console.log('Updated comments');
			res.json(dish);
		});
	});
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		
		dish.comments.id(req.params.commentId).remove();
		
		dish.save(function(err, result){
			if(err) throw err;
			
			res.json(resp);
		});
	});
});

exports.router = dishRouter;
