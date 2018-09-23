(function() {
	var randomWrapperConfig = [
		{
			dotColor: '',
			title: 'Note 1 - Greek Archaeology'
		},
		{
			dotColor: 'dot-color-1',
			title: 'Mathematics - Week 2'
		},
		{
			dotColor: 'dot-color-2',
			title: 'Tennis - Week 1'
		}
	];


	$.ajax({
		method: 'GET',
		url: '/api/v1/notes',
	}).done(function(res) {
		$('.notes').empty();
		if (res.notes && res.notes.length) {
			$.each( res.notes, function( key, val ) {
				if (val.transcript) {
					$('.notes').append(generateNoteWrapper(val))
				}
			});
		}
	})

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	function generateNoteWrapper(note) {
		var wrapperConfig = randomWrapperConfig[getRandomInt(randomWrapperConfig.length)];

		var html = [
			'<a href="/conversion-result?noteID=',
			note.id,
			'">',
			'<div class="test">',
			'<div class="col-1"></div>',
			'<div class="col-10 d-flex align-items-baseline note__box">',
			'<div class="px-2 pt-1">',
			'<div class="dot ' + wrapperConfig.dotColor +  '"></div>',
			'</div>',
			'<div class="d-flex flex-column">',
			'<h1>',
			wrapperConfig.title,
			'</h1>',
			'<p>',
			note.transcript,
			'</p>',
			'</div>',
			'</div>',
			'</div>',
			'</a>'
		].join('');

		return html;
	}

	$(document).ready(function() {
		$('#cam__button').on('click', function() { $('#cam__form__input').click(); });
		$('#cam__form__input').on('change', function() { $('#cam__form__submit').click(); });
	});
})();
