// @ts-nocheck
const User = require('../../models/User');

/**
 * Function that resgiter a new user
 * The body is expected an the email, password, firstName and lastname;
 * @module Auth/Register
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        let data = req.body;
        User.findOne({
            email: data.email
        }, function (err, user) {
            if (err) {
                res.status(231).send('Email already in use!');
                return;
            }

            if (user) {
                res.status(231).send('Email already in use!');
                return;
            }

            let newUser = new User();
            newUser.email = data.email;
            newUser.username = data.username;
            newUser.type = data.type;
            newUser.password = data.password;
            newUser.atribuitesessionid = 'expired';
            newUser.save(function (err, user) {
                if (!err && user) {
                    res.status(230).send(true);
                } else {
                    console.log(err)
                    res.status(500).send('Error on resgisting on server');
                }
            });
        });
    }
}