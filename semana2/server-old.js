var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-old');

var url = 'mongodb://localhost:27017/assignement2';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', function(){
	console.log('Connected correctly to the server.');

	Dishes.create({
		name: 'Uthapizza',
		description: 'Description',
		comments: [
			{
				rating: 3,
				comment: 'This is a well thought phrase',
				author: 'Random person'
			}
		]
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish created!');
		console.log(dish);
		var dishId = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(dishId, 
				{$set: {description: 'Updated Description'}},
				{new: true}
			).exec(function(err, dish){
				if(err) throw err;
				console.log('Updated Dish');
				console.log(dish);

				dish.comments.push({
					rating: 5,
					comment: 'An even better though phrase.',
					author: 'Another random person'
				});

				dish.save(function(err, dish){

					console.log('Updated Comments');
					console.log(dish);

					db.collection('dishes').drop(function(){
						db.close();
					});
				});
			})
		}, 3000);
	});
	
});