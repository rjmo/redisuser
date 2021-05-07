var express = require('express');
var router = express.Router();

/* GET home page. search page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RedisUsers' });
});

module.exports = router;
