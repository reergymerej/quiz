/* jshint node: true */
'use strict';

var mongoose = require('mongoose');

exports.open = function (callback) {
  var db = mongoose.connection;

  db.on('error', console.log.bind(console, 'connection error'));
  db.on('close', function () {});

  db.once('open', function () {
    callback(function () {
      db.close();
    });
  });

  mongoose.connect('mongodb://localhost/quiz');
};