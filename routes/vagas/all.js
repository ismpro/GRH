const Vaga = require('../../models/Vaga');
const User = require('../../models/User')

/**
 * Route that return all roles
 * @module Vaga/all
 * @returns {Vaga}
 */
module.exports = function () {
    return async function (req, res) {
        if(req.session.userid) {
            let user = await User.findById(req.session.userid);

            if (user && user.atribuitesessionid === req.session.sessionId && user.type === "manager") {
                Vaga.find({manager: user._id}, function (err, vagas) {
                    if (!err) {
                        res.status(200).send(vagas)
                    } else {
                        console.log(err)
                        res.status(500).send(err)
                    }
                })
            } else {
                Vaga.find({tipoVaga: true}, function (err, vagas) {
                    if (!err) {
                        res.status(200).send(vagas)
                    } else {
                        console.log(err)
                        res.status(500).send(err)
                    }
                })
            }
        } else {
            Vaga.find({tipoVaga: false}, function (err, vagas) {
                if (!err) {
                    res.status(200).send(vagas)
                } else {
                    console.log(err)
                    res.status(500).send(err)
                }
            })
        }
    }
}