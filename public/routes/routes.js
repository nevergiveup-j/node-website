var express = require('express');
var config = require(process.cwd() + '/config');
var loginDB = require(config.publicDir + '/models/login');


var router = express.Router();

router.get('/', function (req, res) {
	res.render('index',
		{ pageTitle : 'Home' }
	)
});

router.get('/login', function (req, res) {
  res.render('login',
  	{ pageTitle : 'about' }
  )
});

router.post('/login', function(req, res) {

});

router.get('/register', function(req, res) {

});

router.get('/logout', function(req, res) {

});

router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile',
		{ pageTitle : 'profile' }
	)
});

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

module.exports = router;