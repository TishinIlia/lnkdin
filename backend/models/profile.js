var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.get = function (cb) {
  var collection = db.get().collection('profile');
  collection.find().toArray(function (err, documents) {
    if (!err) {
      collection.find().toArray(function (err, documents) {
        cb(err, documents)
      })
    } else {
      cb(err, documents)
    }
  })
};

exports.create = function (profile, cb) {
  var collection = db.get().collection('profile');
  collection.insertOne(profile, null, function (err, profile) {
    if (!err) {
      collection.find().toArray(function (err, documents) {
        cb(err, documents)
      })
    } else {
      cb(err, profile)
    }
  });
};

exports.update = function (id, newData, cb) {
  var collection = db.get().collection('profile');
  collection.updateOne(
    { _id: ObjectID(id)},
    {$set: newData},
    function (err, document) {
      if (!err) {
        collection.find().toArray(function (err, documents) {
          cb(err, documents)
        })
      } else {
        cb(err, document)
      }
    });
};