const Funcao = require('../../models/Funcao');

/**
 * Route that return a role by id
 * @module Funcoes/byId
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        let id = req.params.id;
        if(!id) {
            res.status(400).send("Tens que dar um id valido");
            return;
        }
        Funcao.findById(id, function (err, funcao) {
            if (!err) {
                res.status(200).send(funcao)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}