var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

//middlewares
app.use(morgan('dev'));
app.use(session( {
	name: 'session-id',
	secret: '1235.67890.09876.54321',
	saveUninitialized: true,
	resave: true,
	store: new FileStore()
}));//secret key

function auth(req, res, next){
	console.log(req.headers);
	
	if(!req.session.user) { //se nao tiver user, significa que nao esta autenticado
		var authHeader = req.headers.authorization;
		if(!authHeader){
			var err = new Error('You are not authorizer');
			err.status = 401;
			next(err);
			return;
		}
		
		var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
		var user = auth[0];
		var pass = auth[1];
		
		if(user == 'admin' && pass == 'password'){
			req.session.user = 'admin';
			next();
		} else {
			var err = new Error('You are not authorized.');
			err.status = 401;
			next(err);
		}
		
	}else {
		if(req.session.user === 'admin'){
			console.log('req.session: ', req.session);
			next(); 
		} else {
			var err = new Error('You are not authenticted.');
			err.status = 401;
			naext(err);
		}
		
	}
	
	
}


app.use(auth);

app.use(express.static(__dirname + '/public'));


app.use(function(err, req, res, next){ //esta funcao vai servir para tratar do erro
	
	res.writeHead(err.status || 500, {'WWW-Authenticate': 'Basic', 'Content-Type':'text-plain'});
	res.end(err.message);
});


app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
});