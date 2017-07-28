module.exports = function(sequelize, DataTypes) {
	var BlogPost = sequelize.define('BlogPost', {
		//Remember Sequelize automatically does created_at and updated_at
		//FORM
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1, 160]
		},
		//FORM
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		//FORM
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Tourist Attraction'
		},
		//GENERATED FROM FORM
		location: {
			//Right now, assuming we use a string Address
			//Array of Strings?
			type: DataTypes.STRING,
			allowNull: false
		},
		//FORM
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	});

	BlogPost.associate = function (models) {
		//BlogPosts need an author
		BlogPost.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return BlogPost;
};