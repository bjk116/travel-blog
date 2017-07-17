//html-routes.js - to send back basic html files

//Dependencies
var path = require('path');

//Routes
module.exports = function(app) {
	//Home page
	app.get('/', function(req, res) {
		res.render('index');
	})
}