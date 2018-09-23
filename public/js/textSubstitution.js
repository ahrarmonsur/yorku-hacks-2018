var substitutionRules = [
	{
		target: '=',
		substitution: 'is'
	},
	{
		target: '@',
		substitution: 'at'
	},
	{
		target: '&',
		substitution: 'and'
	},
]

function performTextSubstitution(text) {

	var text_copy = (' ' + text).slice(1);

	for (var i = 0; i < substitutionRules.length; i++) {
		text_copy = text_copy.replace(new RegExp(substitutionRules[i].target, 'g'), substitutionRules[i].substitution);
	}

	return text_copy;
}
