const { Schema, model } = require('mongoose');

const VagaSchema = new Schema({
    requisitos: String,
    dataExpiracao: Date,
    status: {
      type: String,
      enum: ['ativo', 'inativo'],
      default: 'ativo'
    }
});

const FuncaoSchema = new Schema({
    titulo: String,
    descricao: String,
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    vagas: [VagaSchema]
}, { timestamps: true });

module.exports = model('Funcao', FuncaoSchema);