//Connection to database

//Dependencies
var Sequelize = require("sequelize");

//Set up connection information
var sequelize = new Sequelize('blogs_database', 'root', 'Bourassa13!bk', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max:10,
		min: 0,
		idle: 10000
	}
});

//Export connection file for otheres to use
module.exports = sequelize;
