(function() {

	var urlParams = new URLSearchParams(window.location.search);
	var noteID = urlParams.get('noteID');
	console.log(noteID);


	$(document).ready(function() {
		$.ajax({
			method: 'GET',
			url: '/api/v1/notes/' + noteID,
		}).done(function(res) {
			$('#transcript__p').text(performTextSubstitution(res.transcript));
		})
	});

})();
