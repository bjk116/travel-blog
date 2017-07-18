//api-routes.js offers routes for getting and posting data

//Database dependencies
var db = require('../models');

//Routes
module.exports = function(app) {
	//Getting all posts
	//Use to populate a live list maybe?
	app.get('/api/all', function(req, res) {
		db.BlogPost.findAll({})
		.then(function(allBlogs) {
			res.json(allBlogs);
		});
	});

	//Getting posts for a specific location
	
	//Filtering by rating

	//Filter by rating AND location

	//Filter by name search


}