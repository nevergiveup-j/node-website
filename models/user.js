
var mongodb = require(process.cwd() + '/db/db');

function User(user){
    this.email = user.email;
    this.passport = user.passport;
}

module.exports = User;


User.prototype.save = function(callback) {

}
