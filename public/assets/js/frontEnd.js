//need function to make sure that body has at least 1 sentence for summary parser to work

$(document).ready(function(){
	//Generate map

	$('#submit').on('click', function() {	
		event.preventDefault();
		var userSearch = $('#traveltext').val().trim();
		var route = '/search/' + userSearch;
		
		$.get(route, function(data) {
			//If there is no data, popup

			//If there is, populate DOM with it, center map on it
			console.log(data);
		});
	});
});