module.exports = function(sequelize, DataTypes) {
	var Author = sequelize.define('Author', {
		//Giving Author a name of type String
		name: DataTypes.STRING
	});
	
	Author.associate = function(models) {
		Author.hasMany(models.BlogPost, {
			onDelete: 'cascade'
		});
	};

	return Author;
}