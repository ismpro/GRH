
const Candidato = require('../../models/Candidato');

/**
 * Route that return all roles
 * @module Candidato/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Candidato.find({}, function (err, candidatos) {
            if (!err) {
                res.status(200).send(candidatos)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}