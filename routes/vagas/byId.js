const Vaga = require('../../models/Vaga');

/**
 * Route that return a role by id
 * @module Vagas/byId
 * @returns {Vaga}
 */
module.exports = function () {
    return function (req, res) {
        let id = req.params.id;
        if(!id) {
            res.status(400).send("Tens que dar um id valido");
            return;
        }
        Vaga.findById(id, function (err, vaga) {
            if (!err) {
                res.status(200).send(vaga)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}