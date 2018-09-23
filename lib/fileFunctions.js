// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision').v1p3beta1;
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();


function uploadImageToGoogleVision(uri) {
	const request = {
		image: {
			content: fs.readFileSync(uri),
		},
		feature: {
			languageHints: ['en-t-i0-handwrit'],
			type: ['TEXT_DETECTION'],
		},
	};

	return client.documentTextDetection(request)
}

module.exports = {
	uploadImageToGoogleVision: uploadImageToGoogleVision
};
