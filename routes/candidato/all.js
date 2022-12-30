
const Candidato = require('../../models/Candidato');
const Funcao = require('../../models/Funcao');

const getPosition = async function (position) {
    try {
        let funcao = await Funcao.findById(position);
        console.log(funcao)
        return funcao;
    } catch (error) {
        console.log(error)
    }
    
}

/**
 * Route that return all roles
 * @module Candidato/all
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        Candidato.find({}, async function (err, candidatos) {
            if (!err) {

                for (let index = 0; index < candidatos.length; index++) {
                    const candidato = candidatos[index];
                    candidatos[index].vaga = await getPosition(candidato.vaga);
                }

                res.status(200).send(candidatos)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}