const Testes = require('../../models/Testes');
const Candidato = require('../../models/Candidato');
const Vaga = require('../../models/Vaga');
const User = require('../../models/User');

const getCandidatos = async function (id) {
    let output = [];

    let manager = await User.findById(id);
    let vagas = await Vaga.find({ manager: manager._id });

    for (const vaga of vagas) {
        let candidatos = await Candidato.find({ vaga: vaga._id });

        for (const candidato of candidatos) {
            candidato._doc.vaga = vaga;
            output.push(candidato)
        }
    }
    return output
}

/**
 * Route that return all roles
 * @module Testes/all
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {

        let output = []

        let candidatos = await getCandidatos(req.session.userid);

        for (const candidato of candidatos) {
            let testes = await Testes.find({candidato: candidato._id});

            for (const teste of testes) {
                teste._doc.candidato = candidato;
                output.push(teste)
            }
        }

        res.send(output)
        
    }
}