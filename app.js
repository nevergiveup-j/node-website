var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./config');
var routes = require('./public/routes/routes');

var app = express();

// sass conifg
//app.use(sassMiddleware({
//    src: path.join(config.publicDir, 'assets/sass'),
//    dest: path.join(config.publicDir, 'assets/css'),
//    debug: true,
//    force: true,
//    outputStyle: 'expanded',
//    prefix:  '/static/css'
//}));

app.use(cookieParser());
app.use(session({
    secret: 'jun',
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(config.publicDir, 'assets')));

app.set('views', config.publicDir + '/views');
app.set('view engine', 'ejs');


app.get('*', routes);

app.listen(config.port);
