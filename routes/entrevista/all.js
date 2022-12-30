const Entrevista = require('../../models/Entrevista');
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
 * Route that return all entrevistas
 * @module Entrevista/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Entrevista.find({}, async function (err, entrevistas) {
            if (!err) {

                for (let index = 0; index < entrevistas.length; index++) {
                    const entrevista = entrevistas[index];
                    entrevistas[index].candidato = await getCandidato(entrevista.candidato);
                }

                res.status(200).send(entrevistas)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}