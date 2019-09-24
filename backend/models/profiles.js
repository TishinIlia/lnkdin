var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function (cb) {
	var collection = db.get().collection('profiles');
	collection.find().toArray(function (err, documents) {
		cb(err, documents)
	})
};

exports.findById = function (id, cb) {
	var collection = db.get().collection('profiles');
	collection.findOne({ _id: ObjectID(id)}, function (err, document) {
		cb(err, document)
	})
};

exports.create = function (profile, cb) {
	var collection = db.get().collection('profiles');
	collection.insertOne(profile, null, function (err, profile) {
		cb(err, profile)
	});
};

exports.update = function (id, newData, cb) {
	var collection = db.get().collection('profiles');
	collection.updateOne(
		{ _id: ObjectID(id)},
		{$set: newData},
		function (err, document) {
			cb(err, document)
		});
};

exports.delete = function (id, cb) {
	var collection = db.get().collection('profiles');
	collection.deleteOne(
		{ _id: ObjectID(id)},
		null,
		function (err, document) {
			cb(err, document)
		});
};

exports.csv = function (profiles, cb) {
	var collection = db.get().collection('profiles');
	collection.insertMany(profiles, null, function (err, document) {
		cb(err, document)
	})
};
