const { Schema, model } = require('mongoose');

const VagaSchema = new Schema({
    titulo: String,
    descricao: String,
    requisitos: String,
    validade: Date,
    tipoVaga: Boolean,
    escritorio: String
}, { timestamps: true });

module.exports = model('Vaga', VagaSchema);