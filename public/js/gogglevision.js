// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision').v1p3beta1;
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const imageElement = document.getElementById("img");
console.log(imageElement);


imageElement.onchange = function () {
	var file = imageElement.files[0];
	console.log(file);
	//upload(file);
	//drawOnCanvas(file);   // see Example 6
	//displayAsImage(file); // see Example 7
};


// fileName = fileName.replace('C:\\fakepath\\', '');
// const request = {
// 	image: {
// 		content: fs.readFileSync(uri),
// 	},
// 	feature: {
// 		languageHints: ['en-t-i0-handwrit'],
// 		type: ['TEXT_DETECTION'],
// 	},
// };
//
// client
// 	.documentTextDetection(request)
// 	.then(results => {
// 		const fullTextAnnotation = results[0].fullTextAnnotation;
// 		console.log(`Full text: ${fullTextAnnotation.text}`);
// 	})
// 	.catch(err => {
// 		console.error('ERROR:', err);
// 	});
