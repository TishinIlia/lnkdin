var Profiles = require('../models/profiles');
var multer  = require("multer");

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
	console.log(req);
	Profiles.create({
		url: req.body.url,
		date: req.body.date
	}, function (err, profile) {
		if (err) res.sendStatus(500);
		res.sendStatus(200);
	})
};

exports.update = function (req, res) {
	Profiles.update(req.params.id, {url: req.body.url}, function (err, document) {
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
	var upload = multer({dest:"uploads"}).any();
	upload(req, res, function(err) {
		console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
	// let filedata = req.body.file;
	// console.log(filedata)

	// Profiles.csv(profiles, function (err, document) {
	// 	if (err) res.sendStatus(500);
	// 	res.sendStatus(200);
	// })
};
