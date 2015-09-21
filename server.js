var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');



// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + 
	'/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));

//mongoose connect
//mongoose.connect('mongodb://localhost:27017/notesApp');
mongoose.connect('mongodb://admin:root@ds051523.mongolab.com:51523/notes');

//routes
var notesRouter = require('./app/routes/notesRouter.js')(app,express);

//register route
app.use('/api/notes', notesRouter);

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(3000);

