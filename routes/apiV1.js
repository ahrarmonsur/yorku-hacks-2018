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
