//config/auth.js

//Expose our config directly to our applciation using module.exports
module.exports = {
	'facebookAuth' : {
		'clientID'		: '158805471345382',
		'clientSecret'	: '08c0318e79c9b8df305d80306385e7b3',
		'callbackURL'	: 'http://localhost:3000/auth/facebook/callback'
	}
};