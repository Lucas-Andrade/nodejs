var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
	//...
})

.post(Verify.verifyAdminUser, function(req,res,next){
	//...
})

.delete(Verify.verifyAdminUser, function(req,res,next){
	//...
})

dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, 
.put(Verify.verifyAdminUser, 
.delete(Verify.verifyAdminUser, 