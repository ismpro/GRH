const Candidato = require('../../models/Candidato');
const Testes = require('../../models/Testes');
const Funcao = require('../../models/Funcao');
const Entrevista = require('../../models/Entrevista');
const User = require('../../models/User');
const { formatDate } = require('../../app/functions')

const getUser = async function (user) {
    try {
        let u = await User.findById(user);
        return u;
    } catch (error) {
        console.log(error)
    }
}

const getPosition = async function (position) {
    try {
        let funcao = await Funcao.findById(position);
        funcao.manager = await getUser(funcao.manager);
        return funcao;
    } catch (error) {
        console.log(error)
    }
}

const typeEnum = {
    'testeinformatica': "Informatica",
    'testeingles': 'Ingles'
}

/**
 * Route
 * @module Candidato/alterStatus
 * @returns {Function}
 */
module.exports = function (Mailing) {
    return function (req, res) {
        let data = req.body;

        Candidato.findById(data.id, async function (err, candidato) {
            if (!err) {

                candidato.vaga = await getPosition(candidato.vaga);

                switch (data.type) {
                    case "entrevista":

                        let newEntrevista = new Entrevista();

                        newEntrevista.candidato = candidato._id;
                        newEntrevista.date = new Date(data.date);
                        newEntrevista.local = data.local;
                        newEntrevista.notes = "";
                        newEntrevista.status = "undone";

                        try {
                            let entrevista = await newEntrevista.save();

                            await Mailing.sendEmail({
                                email: candidato.email,
                                template: "entrevista",
                                subject: "Convocação para entrevista",
                                nome: candidato.nome,
                                cargo: candidato.vaga.titulo,
                                local: entrevista.local,
                                data: formatDate(entrevista.date),
                                hora: entrevista.date.toLocaleTimeString(),
                                manager: candidato.vaga.manager.nome
                            });
                            res.status(200).send(true);
                        } catch (error) {
                            res.status(500).send(err);
                        }

                        break;

                    case "teste":
                        let newTeste = new Testes();

                        newTeste.candidato = candidato._id;
                        newTeste.type = data.teste;
                        newTeste.schedule.date = new Date(data.date);
                        newTeste.schedule.local = data.local;
                        newTeste.status = "undone";

                        try {
                            let teste = await newTeste.save();

                            if (String(data.local).trim().toLocaleLowerCase() === "online") {
                                Mailing.sendEmail({
                                    email: candidato.email,
                                    template: "teste",
                                    subject: "Convocação para Teste",
                                    local: "online",
                                    link: `http://localhost:3000/teste?id=${teste._id}`,
                                    nome: candidato.nome,
                                    tipo: typeEnum[teste.type],
                                    cargo: candidato.vaga.titulo,
                                    data: formatDate(teste.schedule.date),
                                    hora: teste.schedule.date.toLocaleTimeString(),
                                    manager: candidato.vaga.manager.nome
                                }).then(data=>res.status(200).send(true)).catch(err=>console.log(err));
                            } else {
                                await Mailing.sendEmail({
                                    email: candidato.email,
                                    template: "teste",
                                    subject: "Convocação para Teste",
                                    nome: candidato.nome,
                                    tipo: typeEnum[teste.type],
                                    cargo: candidato.vaga.titulo,
                                    local: teste.schedule.local,
                                    data: formatDate(teste.schedule.date),
                                    hora: teste.schedule.date.toLocaleTimeString(),
                                    manager: candidato.vaga.manager.nome
                                }).then(data=>res.status(200).send(true)).catch(err=>console.log(err));
                            }

                        } catch (error) {
                            res.status(500).send(err);
                        }
                        break;

                    case "aprovar":
                        candidato.status = "aprovado";
                        break;

                    case "reprovar":
                        candidato.status = "reprovado";
                        break;
                }
                candidato.save();
            } else {
                console.log(err);
                res.status(500).send(err);
            }
        })
    }
}