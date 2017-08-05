module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define('Users', {
		//Remember Sequelize automatically does created_at and updated_at
		//FORM
		first_name: {
			type: DataTypes.STRING,
		},
		//FORM
		last_name: {
			type: DataTypes.STRING,
		},
		//GENERATED FROM FORM
		facebook_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		profile_url: {
			type: DataTypes.STRING
		},
		facebook_friends: {
			type: DataTypes.STRING,
			allowNull: true
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			auto_increment: true,
			defaultValue: 1
		}
	});

	return Users;
};