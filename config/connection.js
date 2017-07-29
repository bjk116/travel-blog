//Connection to database

//Dependencies
var Sequelize = require("sequelize");
var mysql = require('mysql');

//Set up connection information
//Creates MySQL connection using Sequelize
if (process.env.JAWSDB_URL) {
	sequelize = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	var sequelize = new Sequelize('blogs_database', 'root', 'Bourassa13!bk', {
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	});	
}

//Export connection file for otheres to use
module.exports = sequelize;