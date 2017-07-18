module.exports = function(sequelize, DataTypes) {
	var BlogPost = sequelize.define('BlogPost', {
		//Remember Sequelize automatically does created_at and updated_at
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1, 160]
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		summary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Tourist Attraction'
		},
		country: {
			//Right now, assuming we use a string Address
			type: DataTypes.STRING,
			allowNull: false
		},
		state:{
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
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