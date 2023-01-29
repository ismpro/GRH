const Candidato = require('../../models/Candidato');

/**
 * Route that return a role by id
 * @module Candidato/create
 * @returns {Function}
 */
module.exports = function () {
    return function (req, res) {
        let data = req.body;
    
        let candidato = new Candidato();
        candidato.nome = data.nome;
        candidato.genero = data.selectedGenero;
        candidato.dataNascimento = data.dataNascimento;
        candidato.endereco = data.endereco;
        candidato.email = data.email;
        candidato.telefone = data.telefone;
        candidato.pretensaoSalarial = data.salario;
        candidato.escolaridade = data.selectedEscolariedade;
        candidato.vaga = data.vaga;
        candidato.habilidades = data.habilidades;
        candidato.experienciaProfissional = data.experiencia;
        candidato.save(function (err, candidato) {
            if (!err && candidato) {
                res.status(200).send(candidato);
            } else {
                console.log(err)
                res.status(500).send('Error on server');
            }
        });
    }
}