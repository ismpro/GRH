const Vaga = require('../../models/Vaga');

/**
 * Route that return a role by id
 * @module Vaga/create
 * @returns {Vaga}
 */
module.exports = function () {
    return function (req, res) {
        let data = req.body;
    
        let vaga = new Vaga();
        vaga.titulo = data.titulo;
        vaga.descricao = data.descricao;
        vaga.requisitos = data.requisitos;
        vaga.validade = data.validade;
        vaga.tipoVaga = data.tipoVaga;

        vaga.save(function (err, vaga) {
            if (!err && vaga) {
                res.status(230).send(vaga);
            } else {
                console.log(err)
                res.status(500).send('Error on server');
            }
        });
    }
}