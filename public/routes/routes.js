var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var config = require(process.cwd() + '/config');
var getData = require(config.publicDir + '/assets/js/getData.js');

var app = express();

exports.init = function() {
	// sass conifg
	app.use(sassMiddleware({
	    src: path.join(config.publicDir, 'assets/sass'),
	    dest: path.join(config.publicDir, 'assets/css'),
	    debug: true,
	    force: true,
	    outputStyle: 'expanded',
	    prefix:  '/static/css'
	}));

	app.use('/static', express.static(path.join(config.publicDir, 'assets')));

	app.set('views', config.publicDir + '/views');
	app.set('view engine', 'ejs');
	//app.engine('ejs', require('ejs').__express);

	app.get('/', function (req, res) {
	  res.render('index',
	  	{ pageTitle : 'Home' }
	  )
	});

	app.get('/login', function (req, res) {
	  res.render('login',
	  	{ pageTitle : 'about' }
	  )
	});

	app.get('/test', getData.insert);

	app.listen(config.port);	
}