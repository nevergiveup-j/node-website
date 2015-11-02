var express = require('express');

var config = require(process.cwd() + '/config/config');

var router = express.Router();


router.get('/', function (req, res) {
	res.render('index',
		{ pageTitle : '主页' }
	)
});

router.get('/login', function (req, res) {
  res.render('login',
  	{ pageTitle : '登录' }
  )
});

router.post('/login', function(req, res) {
	res.render('profile')
});

router.get('/reg', function(req, res) {
	res.render('reg',
		{
			pageTitle : '注册',
			error: req.flash('error').toString()
		}
	)
});

router.post('/reg', function(req, res) {
	var email = req.body.email,
		passport = req.body.passport,
		passportRepeat = req.body.passwordRepeat;

	if(passportRepeat != passport) {
		req.flash('error', '两次输入的密码不一致!');

		return res.redirect('/reg');
	}
});

router.get('/logout', function(req, res) {

});

router.get('/profile', function(req, res) {
	res.render('profile',
		{ pageTitle : 'profile' }
	)
});

// 404/500
router.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

router.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		pageTitle: 'error',
		message: err.message,
		error: {}
	});
});


function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

module.exports = router;