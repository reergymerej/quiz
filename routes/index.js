var express = require('express');
var router = express.Router();

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
    var q = req.body.q;
    var a = req.body.a;

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/quiz');

    var Question = mongoose.model('Question', {
        q: String,
        a: String
    });

    var question = new Question({
        q: q,
        a: q
    });

    question.save(function (err) {
        if (err) {
            res.status(500).end();
        } else {
            res.jsonp(question);
        }
    });
});

module.exports = router;
