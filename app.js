const http = require('http');
const path = require('path');
const express = require('express');
const routes = require('./routes/index');

const hostname = '127.0.0.1';
const port = 3000;

// Set up the Express webserver
const app = express();
// Set the root directory for the views and public files
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
// Attach the routes to the webserver
app.use('/', routes);

// Attach a listener to the webserver to listen for http requests
const server = app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
