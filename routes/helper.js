//All helper functions for api/html routes to keep code separated

var helper = {
	getSummary: function(blogBody) {
		//Find positions of first 4 periods
		//Determine how long the first few sentences, and depending on length return 2-4
		var firstSentence = blogBody.indexOf('.');
		var secondSentence = blogBody.indexOf('.', firstSentence+1);
		var thirdSentence = blogBody.indexOf('.', secondSentence+1);
		var fourthSentence = blogBody.indexOf('.', thirdSentence+1);
		console.log('first sentence index: ' + firstSentence);
		console.log('second sentence index: ' + secondSentence);
		console.log('third sentence index: ' + thirdSentence);
		console.log('fourth sentence index: ' + fourthSentence);
		//algorithm here to determine if to return 2, 3, or 4
		//be sure to account for !, ? punctuation

		//for now, just return all 4 sentence
		//to return first sentence, return str.substring(0, firstSentence+1) and etc for more sentences
		return blogBody.substring(0, fourthSentence+1);
	},
	parseLocation: function(stringLocation, cb) {
		var stringLocation = '';
		//Do stuff here, might need google maps

		return stringLocation;
	}
}

module.exports = helper;