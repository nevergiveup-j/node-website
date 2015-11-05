var express = require('express');
var crypto = require('crypto');
var session = require('express-session');

var config = require(process.cwd() + '/config/config');
var user = require(process.cwd() +  '/models/user');

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
	var email = req.body.email.trim(),
		password = req.body.password.trim(),
		passwordRepeat = req.body.passwordRepeat.trim();

	if(!email.length || !password.length || !passwordRepeat.length) {
		req.flash('error', '不能为空!');

		return res.redirect('/reg');
	}

	if(passwordRepeat != password) {
		req.flash('error', '两次输入的密码不一致!');

		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5');

	password = md5.update(password).digest('hex');

	var newUser = new user({
		email: email,
		password: password
	});

	user.get(email, function(err, user){
		if(err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}

		if(user) {
			req.flash('error', '用户已存在!');
			return res.redirect('/reg');
		}

		newUser.save(function(err, user) {
			if(err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}

			req.session.user = user;
			req.flash('success', '注册成功！');
			res.redirect('/');
		});
	});
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