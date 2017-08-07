var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var passport = require("passport");

module.exports = function(passport) {

	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		//Find a user with given email
		User.findOne({'local.email': email}, function(err, user) {
			if (err) return callback(err);

			//If user already exists
			if (user) {
				return callback(null, false, req.flash('signupMessage', "this email is already taken"));
			} else {
				// User does not exist yet 
				//create it 
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.hash(password);

				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new  LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		  //Search for a user with this email
		  User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
	
};

module.exports = passport;