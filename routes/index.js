var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');
var connection = require('../connection.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/quiz', function (req, res) {
  res.render('quiz')
});

router.get('/entries', function (req, res) {
  res.render('entries')
});

router.post('/entry', function (req, res) {

    connection.open(function (done) {
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
          done();
      });
    });
});

module.exports = router;
