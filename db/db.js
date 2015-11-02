var config = require(process.cwd() + '/config/config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.mongodb.host + config.mongodb.db);



module.exports = mongoose;