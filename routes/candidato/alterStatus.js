const Candidato = require('../../models/Candidato');

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
                switch (data.type) {
                    case "entrevista":
                        if(String(data.local).trim().toLocaleLowerCase() === "online") {
                            Mailing.sendEmail({email: "ismaelourenco@msn.com", template: "entrevista", subject: "Entrevista"});
                        } else {
                            Mailing.sendEmail({email: "ismaelourenco@msn.com", template: "entrevista", subject: "Entrevista"});
                        }
                        break;
                    case "teste":
                        if(String(data.local).trim().toLocaleLowerCase() === "online") {
                            Mailing.sendEmail({email: "ismaelourenco@msn.com", template: "teste", subject: "Teste"});
                        } else {
                            Mailing.sendEmail({email: "ismaelourenco@msn.com", template: "teste", subject: "Teste"});
                        }
                        break;
                }

                candidato.status = data.type;
                candidato.save();
            } else {
                console.log(err);
                res.status(500).send(err);
            }
        })
    }
}