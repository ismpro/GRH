const Candidato = require('../../models/Candidato');
const Testes = require('../../models/Testes');

/**
 * Route
 * @module Candidato/alterStatus
 * @returns {Function}
 */
module.exports = function (Mailing) {
    return function (req, res) {
        let data = req.body;

        console.log(data)

        Candidato.findById(data.id, async function (err, candidato) {
            if (!err) {
                switch (data.type) {
                    case "entrevista":
                        if (String(data.local).trim().toLocaleLowerCase() === "online") {
                            Mailing.sendEmail({ email: "ismaelourenco@msn.com", template: "entrevista", subject: "Entrevista" });
                        } else {
                            Mailing.sendEmail({ email: "ismaelourenco@msn.com", template: "entrevista", subject: "Entrevista" });
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
                                await Mailing.sendEmail({ email: candidato.email, template: "teste", subject: "Teste", link: `http://localhost:3000/teste?id=${teste._id}`, date: teste.schedule.date });
                                res.status(200).send(true);
                            } else {
                                Mailing.sendEmail({ email: "ismaelourenco@msn.com", template: "test", subject: "Teste", local: teste.schedule.local, date: teste.schedule.date });
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