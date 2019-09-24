'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var profilesController = require('./controllers/profiles');
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

app.get('/profiles', profilesController.all);

app.get('/profiles/:id', profilesController.findById);

app.post('/profiles', profilesController.create);

app.post('/profiles/csv', profilesController.csv);

app.put('/profiles/:id', profilesController.update);

app.delete('/profiles', profilesController.delete);

db.connect('mongodb://localhost:27017',function (err) {
	if (err) return console.log(err);
	app.listen(3012, function () {
		console.log('API app start');
	});
});
