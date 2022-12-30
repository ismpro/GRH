const Testes = require('../../models/Testes');
const Candidato = require('../../models/Candidato');
const Funcao = require('../../models/Funcao');

const getPosition = async function (position) {
    try {
        let funcao = await Funcao.findById(position);
        return funcao;
    } catch (error) {
        console.log(error)
    }

}

const getCandidato = async function (id) {
    try {
        let candidato = await Candidato.findById(id);
        candidato.vaga = await getPosition(candidato.vaga);
        return candidato;
    } catch (error) {
        console.log(error)
    }

}

/**
 * Route that return all roles
 * @module Testes/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Testes.find({}, async function (err, testes) {
            if (!err) {

                for (let index = 0; index < testes.length; index++) {
                    const teste = testes[index];
                    testes[index].candidato = await getCandidato(teste.candidato);
                }

                res.status(200).send(testes)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}