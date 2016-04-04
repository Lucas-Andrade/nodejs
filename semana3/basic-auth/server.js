var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(morgan('dev'));

function auth(req, res, next) {
	
	console.log(req.headers);
	
	var authHeader = req.headers.authorization;
	if(!authHeader){ //se for null é porque nao foi enviada autorizacao
		var err = new Error('You are not authenticated');
		err.status = 401;
		next(err); //se chamarmos next a passar error como parametro vamos passar o erro a todas as funcoes seguintes.
		//nenhuma delas vai ser chamada ate chegarmos ao pedaço de codigo que trata do erro
		return;
	}
	
	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); //devolve um array com o username e a password
	var user = auth[0];
	var pass = auth[1];
	
	if (user == 'admin' && pass == 'password'){ //por enquanto nao vamos ir a base de dados ver se o utilizador existe, vamos so verificar se é o administrador
		next(); //autorizado
	} else { //nao autorizado
		var err = new Error('You are not authenticated!');
		err.status = 401;
		next(err);
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

