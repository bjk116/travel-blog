//Setting up passport information

//Dependencies
var FacebookStrategy	= require('passport-facebook');

//load up user model
var User 				= require('../models/users.js');

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
		var friendsList = "";
		console.log('profile');
		console.log(profile._json.friends.data);
		//generate friends list
		var friends = profile._json.friends.data
		for(var i = 0; i< friends.length; i++) {
			console.log(friends[i].id);
			friendsList += friends[i].id + ' ';
		}

		var user_facebook_id = profile._json.id;

		db.Users.findOne({
			where: {facebook_id: user_facebook_id}
		}).then(function(results) {

			//If this person has never been here before, create them in DB
			if(results == null) {
				//relevant user data fields to put in DB
				var user_first_name = profile._json.first_name;
				var user_last_name = profile._json.last_name;
				var profileImage = profile._json.picture.data.url;

				db.Users.create({
					first_name: user_first_name,
					last_name: user_last_name,
					profile_url: profileImage,
					facebook_friends: friendsList,
					facebook_id: user_facebook_id
				});
			} else {//otherwise make sure information is up to date
				//foo bar
				//relevant user data fields to put in DB
				var user_first_name = profile._json.first_name;
				var user_last_name = profile._json.last_name;
				var profileImage = profile._json.picture.data.url;

				db.Users.update({
						first_name: user_first_name,
						last_name: user_last_name,
						profile_url: profileImage,
						facebook_friends: friendsList,
						facebook_id: user_facebook_id
					},
					{
						where: {
							id: user_facebook_id
						}
					}).then(function(result) {
						console.log(result);
					});
			}
		});

		return done(null, profile);
	}));
		
}