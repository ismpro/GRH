const Testes = require('../../models/Testes');

/**
 * Route
 * @module Testes/cancel
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {
        let data = req.body;

        Testes.findById(data.id, async function (err, teste) {
            if (!err) {
                teste.status = "cancel";
                await teste.save()
                res.status(200).send(true)
            } else {
                console.log(err)
                res.status(500).send(err)
            }
        })
    }
}