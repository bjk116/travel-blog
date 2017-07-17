module.exports = function(sequelize, DataTypes) {
	var BlogPost = sequelize.define('BlogPost', {
		//Remember Sequelize automatically does created_at and updated_at
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 160]
			}
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Tourist Attraction'
		},
		location: {
			//For holding longtitude and latitude
			type: DataTypes.ARRAY(DataTypes.DOUBLE),
			allowNull: false
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		}
	});

	BlogPost.associate = function (models) {
		//BlogPosts need an author
		BlogPost.belongsTo(models.Author, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return BlogPost;
};