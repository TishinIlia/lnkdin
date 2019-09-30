var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.requestFriends = function (profiles, cb) {
	var collection = db.get().collection('profiles');
	collection.insertMany(profiles, null, function (err, profiles) {
		if (!err) {
			collection.find().toArray(function (err, documents) {
				cb(err, documents)
			})
		} else {
			cb(err, profiles)
		}
	});
};

exports.updateOne = function (id, newData, cb) {
	var collection = db.get().collection('profiles');
	collection.updateOne(
		{ _id: ObjectID(id)},
		{$set: newData},
		null,
		function (err, document) {
			cb(err, document)
		});
};

exports.updateAll = function (getFriendDataFunction, cb) {
	var collection = db.get().collection('profiles');
	collection.insertMany(profiles, null, function (err, profiles) {
		if (!err) {
			collection.find().toArray(function (err, documents) {
				documents.forEach(function (item) {
					getFriendDataFunction(item.url)
						.then(function (data) {
							collection.updateOne({ _id: ObjectID(id)},
								{$set: {
										updateDate: Date.now(),
										profileData: data
									}
								},
								null,
								function () {
									console.log(item._id + ' updated')
								})
						})
				}
			)
			})
		} else {
			cb(err, profiles)
		}
	});
};
