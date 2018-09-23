const fs = require('fs')
const express = require('express');
const router = express.Router();
const fileFunctions = require('../lib/fileFunctions')

function getAllNotes(req, res) {
	const fileDir = 'assets/file_uploads/';
	const transcriptDir = 'assets/transcripts/';

	fs.readdir(fileDir, (err, files) => {

		if (err) {
			res.status(500).json({error: err});
		}

		responseArr = []
		files.forEach(fileName => {
			var noteFilepaths = { imagePath: fileDir + fileName };
			const transcriptName = fileName.split('.')[0] + '.json';
			console.log(transcriptDir + transcriptName);
			console.log(fs.existsSync(transcriptDir + transcriptName));

			if (fs.existsSync(transcriptDir + transcriptName)) {
				noteFilepaths.transcriptPath = transcriptDir + transcriptName;
			}

			responseArr.push(noteFilepaths);
			console.log(noteFilepaths);
		});
		res.status(200).json({
			error: null,
			notes: responseArr
		});
	})

}
router.get('/notes', getAllNotes);

module.exports = router;
