var Profiles = require('../models/profiles');

exports.all = function (req, res) {
	Profiles.all(function (err, docs) {
		if (err) res.sendStatus(500);
		res.send(docs);
	})
};

exports.findById = function (req, res) {
	Profiles.findById(req.params.id, function (err, document) {
		if (err) res.sendStatus(500);
		res.send(document)
	})
};

exports.create = function (req, res) {
	Profiles.create({
		url: req.body.url,
		date: Date.now()
	}, function (err, profile) {
		if (err) res.sendStatus(500);
		res.sendStatus(200);
	})
};

exports.update = function (req, res) {
	Profiles.update(req.params.id, {url: req.body.url, date: Date.now()}, function (err, document) {
		if (err) res.sendStatus(500);
		res.sendStatus(200);
	});
};

exports.delete = function (req, res) {
	Profiles.delete(req.body.id, function (err, document) {
		if (err) res.sendStatus(500);
		res.sendStatus(200);
	});
};

exports.csv = function (req, res) {
	console.log(req.body)
	var profiles = req.body.map(item => {
		item.date = Date.now();
		return item;
	});
	Profiles.csv(profiles, function (err, document) {
		if (err) res.sendStatus(500);
		res.sendStatus(200);
	})
};
