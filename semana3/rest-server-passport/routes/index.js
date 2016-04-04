var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
