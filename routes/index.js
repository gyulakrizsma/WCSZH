var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
  res.render('index');
});

module.exports = router;
