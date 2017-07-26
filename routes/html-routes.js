//html-routes.js - to send back basic html files

//Dependencies
var path = require('path');

var passport = require('passport');
var FacebookStrategy	= require('passport-facebook').Strategy;

//passwords
var configAuth = require('../config/auth.js');

//To move to another file eventually
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
		enableProof: true,
		scope: ['user_friends'],
		profileFields: ['friends', 'photos']

	},
	//Facebook will send back the token and profile
	function(token, refreshToken, profile, done) {
		//Find if u
	}));

//Routes
module.exports = function(app) {
	//Home page
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/welcomepage.html"));
  	});

  	app.get('/auth/facebook',
  		passport.authorize('facebook'));
	
	app.get('/auth/facebook/callback', 
  		passport.authenticate('facebook', { failureRedirect: '/' }),
  		function(req, res) {
  			console.log('attempting redirect');
    		res.redirect('/create-blog');
  	});

  	app.get('/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res){
    	// console.log('Req:');
    	// console.log(req);
    	console.log('Friends:');
    	//Only shows friends who have used this app by design
    	console.log(req.user._json.friends.data);
    	console.log('Pictures:');
    	console.log(req.user._json)
    	res.render('profile', { user: req.user });
  	});

	app.get('/create-blog', function(req, res) {
		res.render('createBlog');
	});
}