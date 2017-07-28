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

        //User information
        console.log(req.user[0]);

    	db.BlogPost.findAll({
    		where: {
    			UserId: req.user[0].dataValues.id
    		}
    	}).then(function(results) {
    		var titlesAndLinks = [];
    		
    		for(var i = 0; i<results.length; i++) {
                var postLink = "/read/"+results[i].dataValues.id;
    			titlesAndLinks.push({
                    title: results[i].dataValues.title,
                    link: postLink,
                    category: results[i].dataValues.category
                });
    		}
    	  	
    	  	var user = {
    			firstName: req.user[0].dataValues.first_name,
    			lastName: req.user[0].dataValues.last_name,
    			profileURL: image,
    			post: titlesAndLinks,
    		}
    		console.log(user);
    		res.render('profile', user);
    	});
  	});

	app.get('/create-blog', ensureLoggedIn('/login'), function(req, res) {
		res.render('writeBlog');
	});

    //Error routing
    app.get('/error', function(req, res) {
        res.render('error');
    });

    //read all
    app.get('/read/all', function(req, res) {
        db.BlogPost.findAll({
            include: [db.Users]
        }).
        then(function(results){
            console.log('results');
            console.log(results[0]);
            var createdBlogs = [];
            for(var i = 0; i < results.length; i++) {
                var author = results[i].User.dataValues.first_name + ' ' + results[i].User.dataValues.last_name;
                createdBlogs.push({
                    title: results[i].dataValues.title,
                    body: results[i].dataValues.body,
                    facebookID: author,
                    createdAt: results[i].dataValues.createdAt
                })
            }

            console.log(results.dataValues);
            var result = {
                blogs : createdBlogs
            }

            res.render('readBlog', result);
        })
    });

    //Read one blog
    app.get('/read/:id', function(req, res) {
        console.log('ID');
        console.log(req.params.id);
        console.log(parseInt(req.params.id) == NaN);

        if(parseInt(req.params.id) == NaN) {
            res.redirect('/error');
        }

        db.BlogPost.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Users]
        }).then(function(results) {
            console.log(results);
            
            var createdBlog = [];
            var author = results.User.dataValues.first_name + ' ' + results.User.dataValues.last_name;

            createdBlog.push({
                title: results.dataValues.title,
                body: results.dataValues.body,
                facebookID: author,
                createdAt: results.dataValues.createdAt
            });
            var result = {
                blogs: createdBlog
            };
            res.render('readBlog', result);
        });

    });
}