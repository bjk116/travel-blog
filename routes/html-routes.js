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

	app.get('/welcome', ensureLoggedIn('/error'), function(req, res) {		
    	var image = req.user[0].dataValues.profile_url;
    	console.log('image');
    	console.log(req.user[0].dataValues.profile_url);
    	console.log('all info');
    	console.log(req.user[0].dataValues);
    	var user = {
    		firstName: req.user[0].dataValues.first_name,
    		profileURL: req.user[0].dataValues.profile_url
    	}
		res.render('welcome', user);
	});

	app.get('/error', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/error.html"));
	});

	app.get('/auth/facebook',
		passport.authenticate('facebook'));
		
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', 	{ failureRedirect: '/' ,
											  successRedirect: '/welcome'}));

  	app.get('/profile',
		ensureLoggedIn('/'),
		function(req, res){
    	// console.log('Req:');
    	// console.log(req);
    	console.log('Data:');
    	//Only shows friends who have used this app by design
    	console.log(req.user);
    	res.render('profile');
  	});

	app.get('/create-blog', function(req, res) {
		res.render('createBlog');
	});
}