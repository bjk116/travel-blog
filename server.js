//Dependencies and handles to them
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var passport = require('passport');

//Set up port/express
var port = process.env.PORT || 3000;

var app = express();

//Setting up connection to database
var db = require('./models');

//Allow handlebars to access public folder, set up body parser middleware
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Set up passport-session
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Facebook Strategy

//Override with POSt having ?_method=DELETE
//Do we need this currently?  Maybe in future with comments etc
app.use(methodOverride('_method'));

//Set up Handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require("./routes/html-routes.js")(app, passport);
require("./routes/api-routes.js")(app, passport);


// Syncs with sequelize with models then starts our Express app
db.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log('App listening on port ' + port);
	});
});