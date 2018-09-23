const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/conversion-result', function(req, res, next) {
	res.render('conversion-result');
});

module.exports = router;
