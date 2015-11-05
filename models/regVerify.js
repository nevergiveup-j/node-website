var crypto = require('crypto');
var user = require(process.cwd() +  '/models/user');

function Verify(req, res) {
    this.req = req;
    this.res = res;

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

    this.init();
}

Verify.prototype.init = function() {

}

module.exports = Verify;



