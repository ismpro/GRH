const Candidato = require('../../models/Candidato');
const User = require('../../models/User');
const Vaga = require('../../models/Vaga');

/**
 * Route that return a role by id
 * @module Candidato/create
 * @returns {Function}
 */
module.exports = function (Mailing) {
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
        candidato.save(async function (err, candidato) {
            if (!err && candidato) {

                let vaga = await Vaga.findById(candidato.vaga);
                let manager = await User.findById(vaga.manager);
                
                Mailing.sendEmail({
                    email: candidato.email,
                    template: "welcome",
                    subject: "Bem-vindo ao processo de recrutamento e seleção",
                    candidateName: candidato.nome,
                    recruitersName: manager.nome,
                }).then(data=>res.status(200).send(candidato)).catch(err=>console.log(err));
            } else {
                console.log(err)
                res.status(500).send('Error on server');
            }
        });
    }
}