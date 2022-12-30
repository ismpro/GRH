const Testes = require('../../models/Testes');

/**
 * Route that return all roles
 * @module Testes/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Testes.find({}, function (err, testes) {
            if (!err) {
                res.status(200).send(testes)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}