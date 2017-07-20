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
			type: DataTypes.BLOB,
			allowNull: false,
			len: [1]
		},
		//GENERATED FROM FORM
		summary: {
			type: DataTypes.STRING,
			allowNull: false
		},
		//FORM
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Tourist Attraction'
		},
		//GENERATED FROM FORM
		country: {
			//Right now, assuming we use a string Address
			//Array of Strings?
			type: DataTypes.STRING,
			allowNull: false
		},
		//GENERATED FROM FORM
		state: {
			//For use by USA, Canada, Australia, works as Province
			type: DataTypes.STRING,
			allowNull: true
		},
		//GENERATED FROM FORM
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		//FORM
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		//GENERATED FROM FACEBOOK NODE
		facebookID: {
			type: DataTypes.INTEGER,
			allowNull: false
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