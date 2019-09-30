var Profile = require('../models/profile');

exports.get = function (req, res) {
  Profile.get(function (err, docs) {
    if (err) res.sendStatus(500);
    res.send(docs);
  })
};

exports.create = function (req, res) {
  Profile.create({
    email: req.body.email,
    password: req.body.password
  }, function (err, profile) {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  })
};

exports.update = function (req, res) {
  Profile.update(req.body.id, {
    email: req.body.email,
    password: req.body.password
  }, function (err, document) {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  });
};