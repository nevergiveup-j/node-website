
var mongoose = require(process.cwd() + '/db/db');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    level: Number
});

var userModel = mongoose.model('User', userSchema);

function User(user){
    this.email = user.email;
    this.password = user.password;
}

// 保存
User.prototype.save = function(callback) {
    var user = new userModel({
        email: this.email,
        password: this.password
    });

    user.save(function(err, person) {
        if(err) {
            return callback(err);
        }

        callback(null,person);
    });
}

// 获取用户
User.get = function(email, callback) {
    userModel.findOne({email: email}, function(err, person) {
        if(err) {
            return callback(err);
        }

        callback(null, person);
    })
}

module.exports = User;



