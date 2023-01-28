
const Candidato = require('../../models/Candidato');
const Vaga = require('../../models/Vaga');
const User = require('../../models/User');

/**
 * Route that return all roles
 * @module Candidato/all
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {

        let output = [];

        try {
            let manager = await User.findById(req.session.userid);
            let vagas = await Vaga.find({ manager: manager._id });

            for (const vaga of vagas) {
                let candidatos = await Candidato.find({ vaga: vaga._id });

                for (const candidato of candidatos) {
                    candidato._doc.funcao = vaga;
                    output.push(candidato)
                }
            }
            res.send(output)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}