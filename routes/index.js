/* jshint node: true */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');
var connection = require('../connection.js');
var db = connection.db;

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/quiz', function (req, res) {
  res.render('quiz');
});

router.get('/entries', function (req, res) {
  res.render('entries');
});

router.post('/entry', function (req, res) {

    var question = new models.Question({
        q: req.body.q,
        a: req.body.a
    });

    question.save(function (err, question) {
        if (err) {
            res.status(500).end();
        } else {
            res.jsonp(question);
        }
    });
});

router.get('/test', function (req, res) {

  models.getTest(function (err, test) {
    if (err) {
      res.status(500).end();
    } else {
      res.jsonp(test);
    }
  });
});

router.post('/response', function (req, res) {

  var q = req.body.questionId;
  var a = req.body.answerId;

  var response = new models.Response({
    q: q,
    a: a,
    correct: q === a
  });

  response.save(function (err, response) {
    if (err) {
      res.status(500).end();
    } else {
      res.jsonp(response);
    }
  });
});

module.exports = router;
