const Vaga = require('../../models/Vaga');

/**
 * Route that return a role by id
 * @module Vaga/edit
 * @returns {Vaga}
 */
module.exports = function () {
    return async function (req, res) {
        let data = req.body;

        let vaga = await Vaga.findById(req.body.id);
        vaga.titulo = data.titulo;
        vaga.descricao = data.descricao;
        vaga.requisitos = data.requisitos;
        vaga.validade = data.validade;
        vaga.tipoVaga = data.tipoVaga;
        vaga.escritorio = data.selectedOffice;
        vaga.manager = req.session.userid;

        vaga.save(function (err, vaga) {
            if (!err && vaga) {
                res.status(200).send(vaga);
            } else {
                console.log(err)
                res.status(500).send('Error on server');
            }
        });
    }
}