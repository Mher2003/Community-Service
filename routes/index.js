var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Community Service' });
});
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Community Service' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Community Service' });
});


module.exports = router;
