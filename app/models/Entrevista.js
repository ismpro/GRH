const { Schema, model } = require('mongoose');

const EntrevistaSchema = new Schema({
  candidato: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidato' },
  vaga: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaga' },
  data: Date,
  hora: String,
  local: String,
  resultado: {
    type: String,
    enum: ['aprovado', 'reprovado'],
    default: 'reprovado'
  }
}, { timestamps: true });

module.exports = model('Entrevista', EntrevistaSchema);