//Setting up passport information

//Dependencies
var FacebookStrategy	= require('passport-facebook').Strategy;

//load up user model
var user 				= require('../models/author.js');

//Load the config variables
var configAuth			= require('./auth.js');

module.exports = function(passport) {
	
	//used to seriealize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//Used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findByID(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use(new FacebookStrategy({
		//pull in our app ide and secret code from auth.js
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL,
		scope: ['user_friends'],
		profileFields: ['friends', 'photo']

	},
	//Facebook will send back the token and profile
	function(token, refreshToken, profile, done) {
		//Find if u
	}));
		
}