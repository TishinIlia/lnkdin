var MongoClient = require('mongodb').MongoClient;
const DB_NAME = 'test';

var state = {
	db: null
};

exports.connect = function (url, done) {
	if (state.db) done();

	MongoClient.connect(url,
		{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	function (err, database) {
		if (err) done(err);
		state.db = database.db(DB_NAME);
		done();
	})
};

exports.get = function() {
	return state.db;
};

