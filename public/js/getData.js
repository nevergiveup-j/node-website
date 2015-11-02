var mongoose = require('mongoose');


var App6 = mongoose.model("App6", {
    id: Number,
    name: String
});

var db = mongoose.createConnection('localhost','test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log(callback);
});

exports.insert = function(req, res) {

}

