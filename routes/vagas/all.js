const Vaga = require('../../models/Vaga');

/**
 * Route that return all roles
 * @module Vaga/all
 * @returns {Vaga}
 */
module.exports = function () {
    return function (req, res) {
        Vaga.find({}, function (err, vagas) {
            if (!err) {
                res.status(200).send(vagas)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}