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
		const fullTextAnnotation = results[0].fullTextAnnotation;
		console.log(results);
		console.log(`Full text: ${fullTextAnnotation.text}`);
	}).catch(err => {
		console.log(`Error: ${err}`);

	});

	res.end('dsafsdf');
}
router.post('/handwritten', handwritten_upload, relayImageToGoogleVision);

module.exports = router;
