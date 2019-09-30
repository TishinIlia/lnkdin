'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var profilesController = require('./controllers/profiles');
var profileController = require('./controllers/profile');
var db = require('./db');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	credentials: true,
	exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

app.get('/', function (req, res) {
	res.send('Hello world');
});

app.get('/profiles', profilesController.requestFriends);

app.put('/profiles', profilesController.updateOne);

app.put('/profiles/all', profilesController.updateAll);

app.get('/profile', profileController.get);

app.post('/profile', profileController.create);

app.put('/profile', profileController.update);

db.connect('mongodb://localhost:27017',function (err) {
	if (err) return console.log(err);
	app.listen(3012, function () {
		console.log('API app start');
	});
});
