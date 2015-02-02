'use strict';

var mongoose = require('mongoose');
var Question = mongoose.model('Question', {
    q: String,
    a: String
});

exports.Question = Question;