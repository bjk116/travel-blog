//Dependencies and handles to them
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

//Allow handlebars to access public folder, set up body parser middleware
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));

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

// Starts the server to begin listening
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});