const Vaga = require('../../models/Vaga');

/**
 * Route that return a role by id
 * @module Vaga/delete
 * @returns {Vaga}
 */
module.exports = function () {
    return async function (req, res) {
        let data = req.body;

        console.log(data)

        let vaga = await Vaga.findByIdAndDelete(req.body.id);
    
        res.status(200).send(vaga);
    }
}