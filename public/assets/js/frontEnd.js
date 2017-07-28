//need function to make sure that body has at least 1 sentence for summary parser to work
function populateResultsDiv(data) {

}

function clearResultsDOM() {
	$('#results').empty;
}

$(document).ready(function(){
	//Generate map
	//Initiaalize modal


	$('#submit').on('click', function() {	
		event.preventDefault();
		clearResultsDOM();
		var userSearch = $('#traveltext').val().trim();
		var route = '/search/' + userSearch;
		
		$.get(route, function(data) {
			console.log('Search Results: ');
			console.log(data);
			//If there is no data, popup
			if(data.length===0) {

			} else {

				for(var i = 0; i<data.length; i++) {
					$('#results').html('<li class = "list-group-item"><a href=\'/read/'+data[i].id+'\'>' + data[i].title + ' ' +
											 data[i].rating +'/5 , By ' + data[i].User.first_name + ' ' +
											 data[i].User.last_name + ' </a></li>');
				}
			}
			//If there is, populate DOM with it, center map on it
			console.log(data);


		});
	});
});