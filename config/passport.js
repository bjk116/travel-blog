//Setting up passport information

//Dependencies
var FacebookStrategy	= require('passport-facebook');

//load up user model
var User 				= require('../models/Users.js');

//Load the config variables
var configAuth			= require('./auth.js');
var db 					= require('../models');


module.exports = function(passport) {
	
	//used to seriealize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//Used to deserialize the user
	passport.deserializeUser(function(id, done) {
		console.log('desrializing');
		console.log('about to search');
		db.Users.findAll({where:{ facebook_id: id}}).then(function(user){
			done(null, user);
		});
	});
	
	passport.use(new FacebookStrategy({
		//pull in our app ide and secret code from auth.js
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL,
		scope: ['user_friends'],
		profileFields: ['id', 'name', 'friends', 'photos']

	},
	//Facebook will send back the token and profile
	function(token, refreshToken, profile, done) {
		console.log(profile);
		return done(null, profile);
	}));
		
}