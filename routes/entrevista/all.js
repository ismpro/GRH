const Entrevista = require('../../models/Entrevista');

/**
 * Route that return all entrevistas
 * @module Entrevista/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Entrevista.find({}, function (err, entrevistas) {
            if (!err) {
                res.status(200).send(entrevistas)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}