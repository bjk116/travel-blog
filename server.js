//Dependencies and handles to them
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
/*
	SECERET ID THIS TO SEPARATE JS FILE
*/

passport.use(new Strategy({
    clientID: '1523359384376925',
    clientSecret: 'eedfb6ca50e73fe8217f6dc3408389d3',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    //request friends
    scope: ['user_friends'],
    profileFields: ['friends', 'photos']

  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));



var port = process.env.PORT || 3000;

var app = express();

//Setting up connection to database
var db = require('./models');

//Allow handlebars to access public folder, set up body parser middleware
app.use(express.static('./public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Override with POSt having ?_method=DELETE
//Do we need this currently?  Maybe in future with comments etc
app.use(methodOverride('_method'));

//Set up Handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncs with sequelize with models then starts our Express app
db.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log('App listening on port ' + port);
	});
});