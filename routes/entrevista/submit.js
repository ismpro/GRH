const Entrevista = require('../../models/Entrevista');

/**
 * Route
 * @module Entrevista/submit
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {
        let data = req.body;

        Entrevista.findById(data.id, async function (err, entrevista) {
            if (!err) {
                entrevista.notes = data.notes;
                entrevista.doneWhen = new Date();
                entrevista.status = "done";
                await entrevista.save();
                res.status(200).send(true)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}