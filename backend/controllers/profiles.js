var Profiles = require('../models/profiles');
var scrapedinFriends = require('../parser/mainProfile');
var scrapedin = require('../parser/index')
var Profile = require('../models/profile');

exports.updateOne = function (req, res) {
	Profile.get(function (err, docs) {
		scrapedin(docs[0])
			.then(function (func) {
				func(req.body.url)
					.then(function (data) {
						Profiles.updateOne(req.body.id,
							{
								updateDate: Date.now(),
								profileData: data
							},
							function (err, document) {
								if (err) res.sendStatus(500);
								res.sendStatus(200);
							})
					})
			})
	})
};

exports.updateAll = function (req, res) {
	Profile.get(function (err, docs) {
		scrapedinFriends(docs[0])
			.then(function(func) {
				Profiles.updateAll(
					func,
					function (err, document) {
						if (err) res.sendStatus(500);
						res.sendStatus(200);
					})
			})
	})
};

exports.requestFriends = function (req, res) {
	Profile.get(function (err, docs) {
		scrapedinFriends(docs[0])
			.then(function(func) {
				func('https://www.linkedin.com/in/tishin/')
					.then(function (data) {
						Profiles.requestFriends(data.map(function (item) {
							return {
								url: item,
								date: Date.now()
							}
						}), function (err, data) {
							if (err) res.sendStatus(500);
							// res.sendStatus(200);
							res.send(data)
						})
					})
			})
	})
};