const fs = require('fs')
const express = require('express');
const router = express.Router();
const fileFunctions = require('../lib/fileFunctions')
const fileDir = 'assets/file_uploads/';
const transcriptDir = 'assets/transcripts/';

function getAllNotes(req, res) {

	fs.readdir(fileDir, (err, files) => {

		if (err) {
			res.status(500).json({error: err});
		}

		responseArr = []
		files.forEach(fileName => {
			let noteFilepaths = { imagePath: fileDir + fileName };
			const noteID = fileName.split('.')[0];
			const transcriptName = noteID + '.json';

			if (fs.existsSync(transcriptDir + transcriptName)) {
				const transcriptObj = JSON.parse(fs.readFileSync(transcriptDir + transcriptName, 'utf8'));
				const transcriptText = transcriptObj.fullTextAnnotation.text;
				noteFilepaths.transcript = transcriptText;
				noteFilepaths.id = noteID;
			}

			responseArr.push(noteFilepaths);
		});
		res.status(200).json({
			error: null,
			notes: responseArr
		});
	})

}
router.get('/notes', getAllNotes);

function getTranscript(req, res) {
	const noteID = req.params.noteID;
	const transcriptObj = JSON.parse(fs.readFileSync(transcriptDir + noteID + '.json', 'utf8'));
	const transcriptText = transcriptObj.fullTextAnnotation.text;

	res.status(200).json({
		error: null,
		transcript: transcriptText
	});
}
router.get('/notes/:noteID', getTranscript);

module.exports = router;
