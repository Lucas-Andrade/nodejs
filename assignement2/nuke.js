var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/assignement2';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', function(){
	console.log('Connected correctly to the server.');

	db.collection('dishes').drop(function(){
		db.close();
	});
	
});

db.once('open', function(){
	console.log('Connected correctly to the server.');

	db.collection('promotions').drop(function(){
		db.close();
	});
	
});

db.once('open', function(){
	console.log('Connected correctly to the server.');

	db.collection('leadership').drop(function(){
		db.close();
	});
	
});