const Funcao = require('../../models/Funcao');

/**
 * Route that return a role by id
 * @module Funcoes/create
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        let data = req.body;
    
        let funcao = new Funcao();
        funcao.titulo = data.titulo;
        funcao.descricao = data.descricao;
        funcao.manager = data.manager;
        funcao.vagas = [];

        funcao.save(function (err, funcao) {
            if (!err && funcao) {
                res.status(230).send(funcao);
            } else {
                console.log(err)
                res.status(500).send('Error on server');
            }
        });
    }
}