var config = require('../config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.mongodb.host);

exports.mongoose = mongoose;