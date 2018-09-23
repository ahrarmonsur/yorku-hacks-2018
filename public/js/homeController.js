(function() {
	$.ajax({
		method: 'GET',
		url: '/api/v1/notes',
	}).done(function(res) {
		console.log(res.notes);
		if (res.notes && res.notes.length) {
			$.each( res.notes, function( key, val ) {
				/*
				 * Add the logic to construct the dom from the images and the JSON transcript for each note here
				 */
			});
		}
	})

	$(document).ready(function() {
		$('#cam__button').on('click', function() { $('#cam__form__input').click(); });
		$('#cam__form__input').on('change', function() { $('#cam__form__submit').click(); });
	});
})();
