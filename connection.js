/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;

// mongoose.connect('mongodb://localhost/quiz');
mongoose.connect('mongodb://dude:dude@troup.mongohq.com:10027/reergymerej');

db.on('error', console.log.bind(console, 'connection error'));
db.on('close', function () {
  console.log('db connection closed');
});
db.once('open', function () {
  console.log('db connection open');
});

exports.db = db;