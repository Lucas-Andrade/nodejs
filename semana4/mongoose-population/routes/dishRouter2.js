//...

dishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req, res, next)){
	Dishes.find({}) 
		.populate('comments.postedBy') //colocar esta linha em todos 
		.function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
}

//na route dos comments
.all(Verify.VerifyOrdinaryUser)

.post(function(req, res, next){
	
	Dishes.findById(req.params.dishId, function(err, dish){
		if (err) throw err;
		
		req.body.postedBy = req.decoded._doc._id; //adicionei isto
		
		//...
	})
});

.put(function(req.res,next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if (err) throw err;
		
		dish.comments.id(req.params.commentId).remove();
		
		req.body.postedBy = req.decoded._doc._id; //adicionei isto
		
		dish.comments.push(req.body); 
		
		//...
	});
})

delete(Verify.verifyAdmin, function(req.res,next){
	Dishes.findById(req.params.dishId, function(err, dish){
		//vamos adicionar aqui uma verificacao para ver se a pessoa que está a tentar apagar o comment é a mesma que o postou.
		if(dish.comment.id(req.params.commentI).postedBy != req.decoded._doc._id){
			var err = new Error('You are not authorized to perform this operation!');
			err.status = 403;
			return next(err);
		}
		
		dish.comments.id(req.params.commentsId) //...
		
	});
	
});