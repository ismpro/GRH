const Entrevista = require('../../models/Entrevista');

/**
 * Route
 * @module Entrevista/cancel
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {
        let data = req.body;

        Entrevista.findById(data.id, async function (err, entrevista) {
            if (!err) {
                entrevista.status = "cancel";
                await entrevista.save();
                res.status(200).send(true)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}