const Testes = require('../../models/Testes');
const path = require("path");
const { isValidObjectId } = require('mongoose');

/**
 * Route
 * @module Testes/get
 * @returns {Function}
 */
module.exports = function () {
    return async function (req, res) {
        let id = req.query.id;

        if(!id) {
            res.status(200).sendFile(path.join(global.appRoot, 'www', `testeinvalid.html`))
            return;
        } 
        if(!isValidObjectId(id)) {
            res.status(200).sendFile(path.join(global.appRoot, 'www', `testeinvalid.html`))
            return;
        }
        
        let teste = await Testes.findById(id);

        if(!teste) {
            res.status(200).sendFile(path.join(global.appRoot, 'www', `testeinvalid.html`))
            return;
        } 

        if(['done', 'expired'].includes(teste.status)) {
            res.status(200).sendFile(path.join(global.appRoot, 'www', `testeinvalid.html`))
            return;
        } 

        if(teste.schedule.date.getTime() > Date.now()) {
            teste.status = "expired";
            teste.save()
            res.status(200).sendFile(path.join(global.appRoot, 'www', `testeinvalid.html`))
            return;
        }

        res.status(200).sendFile(path.join(global.appRoot, 'www', `${teste.type}.html`))
    }
}