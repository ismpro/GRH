const Candidato = require('../../models/Candidato');

/**
 * Route that return a role by id
 * @module Candidato/byId
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        let id = req.params.id;
        if(!id || (id && !Number.isInteger(id))) {
            res.status(400).send("Tens que dar um id valido");
            return;
        }
        Candidato.findById(id, function (err, candidato) {
            if (!err) {
                res.status(200).send(candid0ato);
            } else {
                console.log(err);
                res.status(500).send(err);
            }
        })
    }
}