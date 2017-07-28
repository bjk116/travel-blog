//html-routes.js - to send back basic html files

//Dependencies
var path = require('path');

//passwords
var configAuth = require('../config/auth.js');

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var db = require('../models');

//Routes
module.exports = function(app, passport) {
	//To get Facebook strategy
	require('../config/passport.js')(passport);

	// Routes
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/welcomepage.html"))});

	app.get('/loggedIn', ensureLoggedIn('/login'), function(req, res) {		
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
											  successRedirect: '/loggedIn'}));

  	app.get('/profile', ensureLoggedIn('/login'), function(req, res) {
    	var image = req.user[0].dataValues.profile_url;

    	db.BlogPost.findAll({
    		where: {
    			UserId: req.user[0].dataValues.UserId
    		}
    	}).then(function(results) {

    		var titles = [];
    		
    		for(var i = 0; i<results.length; i++) {
    			titles.push(results[i].dataValues.title);
    		}
    		/*
    		console.log('RESULTS');
    		console.log(results);*/
    	  	
    	  	var user = {
    			firstName: req.user[0].dataValues.first_name,
    			lastName: req.user[0].dataValues.last_name,
    			profileURL: image,
    			post: titles
    		}
    		console.log(user);
    		res.render('profile', user);
    	})

  	});

	app.get('/create-blog', ensureLoggedIn('/login'), function(req, res) {
		res.render('writeBlog');
	});
}