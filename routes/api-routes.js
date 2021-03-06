//api-routes.js offers routes for getting and posting data

//Database dependencies
var db = require('../models');
var helper = require('./helper.js');
var sequelize = require('../config/connection.js');

//Routes
module.exports = function(app, passport) {
	//C - Create
	app.post('/create-blog', function(req, res) {
		console.log('req.body');
		console.log(req.body);
		console.log(req.user[0].dataValues.facebook_id);

		db.BlogPost.create({
			title: req.body.blogTitle,
			body: req.body.blogBody,
			category: req.body.blogCategory,
			location: req.body.blogLocation,
			rating: req.body.blogRating,
			//Facebook ID used for user Id
			UserId: req.user[0].dataValues.id
		});

		res.redirect('/loggedIn');
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
	app.get('/search/:location', function(req, res) {
		var location = req.params.location.toLowerCase();
		var whereCondition = '%'+location+'%';
		//Search DB based on location, find locations like the one submitted
		db.BlogPost.findAll({
			where: { location: { $like: whereCondition } },
			limit: 10,
			include: [db.Users]	
		}).then(function(blogSearchResults) {
			res.json(blogSearchResults);
		});
	});

}