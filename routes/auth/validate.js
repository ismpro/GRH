const User = require('../../models/User');

/**
 * Function that return true if the user is with session
 * @module Auth/Validate
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        if (req.session.userid) {
            User.findById(req.session.userid, (err, user) => {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    if (user && user.atribuitesessionid === req.session.sessionId) {
                        res.status(200).send({isAuth: true, type: user.type, name: user.nome})
                    } else {
                        res.status(200).send({isAuth: false})
                    }
                }
            })
        } else {
            res.status(200).send(false)
        }
    }
}