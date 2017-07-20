//api-routes.js offers routes for getting and posting data

//Database dependencies
var db = require('../models');
var helper = require('./helper.js');

//Routes
module.exports = function(app) {
	//C - Create
	app.post('/create-blog', function(req, res) {
		console.log(req.body);
		//Create rest of information required for database entry
		//function to get summary of blog post
		var summary = helper.getSummary(req.body.blogBody);
		helper.parseLocation(req.body.location, function(data) {

		});
		console.log(summary);
	});

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