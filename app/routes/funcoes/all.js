const Funcao = require('../../models/Funcao');

/**
 * Route that return all roles
 * @module Funcoes/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Funcao.find({}, function (err, funcoes) {
            if (!err) {
                res.status(200).send(funcoes)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}