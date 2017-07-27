//html-routes.js - to send back basic html files

//Dependencies
var path = require('path');

//passwords
var configAuth = require('../config/auth.js');

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

//Routes
module.exports = function(app, passport) {
	//To get Facebook strategy
	require('../config/passport.js')(passport);

	// Routes
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/welcomepage.html"))});

	app.get('/welcome', ensureLoggedIn('/login'), function(req, res) {		
    	var image = req.user[0].dataValues.profile_url;
    	var user = {
    		firstName: req.user[0].dataValues.first_name,
    		profileURL: req.user[0].dataValues.profile_url
    	}
		res.render('welcome', user);
	});

	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/login.html"));
	});

	app.get('/auth/facebook',
		passport.authenticate('facebook'));
		
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', 	{ failureRedirect: '/' ,
											  successRedirect: '/welcome'}));

  	app.get('/profile', ensureLoggedIn('/login'), function(req, res) {
    	var image = req.user[0].dataValues.profile_url;
    	var user = {
    		firstName: req.user[0].dataValues.first_name,
    		lastName: req.user[0].dataValues.last_name,
    		profileURL: image
    	}
    	    	res.render('profile', user);
  	});

	app.get('/create-blog', ensureLoggedIn('/login'), function(req, res) {
		res.render('writeBlog');
	});
}