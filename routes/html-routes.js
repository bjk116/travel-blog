//html-routes.js - to send back basic html files

//Dependencies
var path = require('path');

//passwords
var configAuth = require('../config/auth.js');

var ensureLogged = require('connect-ensure-login');

//Routes
module.exports = function(app, passport) {
	//To get Facebook strategy
	require('../config/passport.js')(passport);

	// Routes
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../views/welcomepage.html"))});

	app.get('/welcome', function(req, res) {
		ensureLogged.ensureLoggedIn('/'),
		function(req, res){

    	console.log('Friends:');
    	//Only shows friends who have used this app by design
    	console.log(req.user._json.friends.data);
    	console.log('Pictures:');
    	console.log(req.user._json)
    	res.render('profile', { user: req.user });

		res.sendFile(path.join(__dirname, "../views/welcome.html"));
	}});

	app.get('/auth/facebook',
		passport.authenticate('facebook'));
		
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', 	{ failureRedirect: '/' ,
											  successRedirect: '/welcome'}));

  	app.get('/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res){
    	// console.log('Req:');
    	// console.log(req);
    	console.log('Data:');
    	//Only shows friends who have used this app by design
    	console.log(req.user._json);
    	res.render('profile');
  	});

	app.get('/create-blog', function(req, res) {
		res.render('createBlog');
	});
}