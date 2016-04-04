var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotion');
var Leadership = require('./models/leader');

var url = 'mongodb://localhost:27017/assignement2';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

var dishesConnection = function(next){
	console.log('Connected correctly to the server for dishes test.');

	Dishes.create({
		name: 'Uthapizza',
		image: 'images/uthapizza.png',
		category : 'mins',
		label: 'Hot',
		price: '€4.99',
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
						console.log('Dropped dishes connection');
						next();
					});
				});
			})
		}, 3000);
	});
};

var promoConnection = function(next){
	console.log('Connected correctly to the server for promotions test.');

	Promotions.create({
		name: 'Weekend Grand Buffet',
		image: 'images/buffet.png',
		label: 'New',
		price: '€19.99',
		description: 'Description of buffet',
	}, function(err, promo){
		if(err) throw err;

		console.log('Promotion created!');
		console.log(promo);
		var promoId = promo._id;

		setTimeout(function(){
			Promotions.findByIdAndUpdate(promoId, 
				{$set: {description: 'Updated promotion description'}},
				{new: true}
			).exec(function(err, promo){
				if(err) throw err;
				console.log('Updated Promotion');
				console.log(promo);

				db.collection('promotions').drop(function(){
					console.log('Dropped promotions connection');
					next();
				});
			})
		}, 3000);
	});
	
};

var leadersConnection = function(next){
	console.log('Connected correctly to the server for leadership test.');

	Leadership.create({
		name: 'CEO NAME',
		image: 'images/ceo.png',
		designation: 'Chief Epicurious Officer',
		abbr: 'CEO',
		description: 'The boss',
	}, function(err, leader){
		if(err) throw err;

		console.log('Leader created!');
		console.log(leader);
		var leaderId = leader._id;

		setTimeout(function(){
			Leadership.findByIdAndUpdate(leaderId, 
				{$set: {description: 'Updated Description of the boss'}},
				{new: true}
			).exec(function(err, leader){
				if(err) throw err;
				console.log('Updated Leader');
				console.log(leader);

				db.collection('Leadership').drop(function(){
					console.log('Dropped leadership connection');
					next();
				});
			})
		}, 3000);
	});
	
};

db.once('open', function(){

	dishesConnection(function(){
		promoConnection(function() {
			leadersConnection(function() {
				db.close();
			});
		});
	});
});

