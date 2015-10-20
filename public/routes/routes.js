var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var config = require(process.cwd() + '/config');

var app = express();

exports.init = function() {
	// sass conifg
	app.use(sassMiddleware({
	    src: path.join(config.publicDir, 'assets/sass'),
	    dest: path.join(config.publicDir, 'assets/css'),
	    debug: false,
	    outputStyle: 'compressed',
	    prefix:  '/static/css'
	}));

	app.use('/static', express.static(path.join(config.publicDir, 'assets')));

	app.set('views', config.publicDir + '/views');
	app.set('view engine', 'jade');
	app.engine('jade', require('jade').__express);

	app.get('/', function (req, res) {
	  res.render('index',
	  	{ pageTitle : 'Home' }
	  )
	});

	app.get('/about', function (req, res) {
	  res.render('about',
	  	{ pageTitle : 'about' }
	  )
	});

	app.listen(config.port);	
}