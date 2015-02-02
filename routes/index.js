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

module.exports = router;
