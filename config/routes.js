var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require("passport");

// Parses information from POST method(s)
var bodyParser = require('body-parser');
// Used to manipulate POST method(s)
var methodOverride = require('method-override');

var usersController = ('../controllers/users');
var staticsController = ('../controllers/statics');
var artistController = ('../controllers/artists');

function authenticatedUser(req, res, next){
	//if user is authenticated, then we continue
	if (req.isAuthenticated()) return next();
	//else req is redirected to the home
	res.redirect('/');
}

// homepage
router.route('/')
	.get(staticsController.home);

// create a new acconut
router.route('/signup')
	.get(usersController.getSignup)
	.get(usersController.postSignup)

//log in to new account
router.route('/login')
	.