const { Schema, model } = require('mongoose');

const VagaSchema = new Schema({
    requisitos: String,
    dataExpiracao: Date,
    status: {
      type: String,
      enum: ['ativa', 'inativa'],
      default: 'ativa'
    }
});

const FuncaoSchema = new Schema({
    titulo: String,
    descricao: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vagas: [VagaSchema]
}, { timestamps: true });

module.exports = model('Funcao', FuncaoSchema);