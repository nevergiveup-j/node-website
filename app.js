var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var config = require('./config/config');
var routes = require('./routes/routes');

var app = express();

// sass conifg
app.use(sassMiddleware({
    src: path.join(config.publicDir, 'assets/sass'),
    dest: path.join(config.publicDir, 'assets/css'),
    debug: true,
    force: true,
    outputStyle: 'expanded',
    prefix:  '/static/css'
}));

app.use(cookieParser());
app.use(session({
    secret: config.cookieSecret,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } //30 days
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use('/static', express.static(path.join('public')));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(config.port);
