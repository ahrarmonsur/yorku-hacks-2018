// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision').v1p3beta1;
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = document.getElementById("img");
filename = fileName.replace(/C:\\fakepath\\/, '');


const request = {
  image: {
    content: fs.readFileSync(fileName),
  },
  features: {
    languageHints: ['en-t-i0-handwrit'],
    type: ['TEXT_DETECTION'],
  },
};

client
  .documentTextDetection(request)
  .then(results => {
    const fullTextAnnotation = results[0].fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  