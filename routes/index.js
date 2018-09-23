const fs = require('fs')
const multer= require('multer');
const express = require('express');
const router = express.Router();
const fileFunctions = require('../lib/fileFunctions')

// Set up the destination path and the custom filename for handwritten image uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	    cb(null, 'assets/file_uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

// This enables the backend to receive an image file from a POST request,
// with the **name** attribute of the file being 'handwritten_image'
const handwritten_upload = multer({ storage: storage }).single('handwritten_image');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/conversion-result',(req, res, next) => {
	res.render('conversion-result');
});

function relayImageToGoogleVision(req, res, next) {
	fileFunctions.uploadImageToGoogleVision(req.file.path).then(results => {
		console.log(req.file);
		const fileName = req.file.filename.split('.')[0];
		const transcript = results[0];

		// Save a copy of the transcript
		fs.writeFile('assets/transcripts/' + fileName + '.json', JSON.stringify(transcript), (err) => {
			// throws an error, you could also catch it here
			if (err) throw err;

			// success case, the file was saved
			console.log('Transcript saved!');
		});

		res.redirect('/conversion-result?noteID=' + fileName);
	}).catch(err => {
		res.end(`Error: ${err}`);
	});
}
router.post('/handwritten', handwritten_upload, relayImageToGoogleVision);

module.exports = router;
