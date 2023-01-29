const { Schema, model } = require('mongoose');

const CandidatoSchema = new Schema({
  nome: String,
  endereco: String,
  email: String,
  telefone: String,
  dataNascimento: Date,
  genero: String,
  escolaridade: String,
  experienciaProfissional: String,
  habilidades: [String],
  pretensaoSalarial: Number,
  type: {
    type: String,
    enum: ['Interno', 'Externo'],
    default: 'Externo'
  },
  status: {
    type: String,
    enum: ['aprovado', 'reprovado','triagem', 'teste'],
    default: 'triagem'
  },
  vaga: { type: Schema.Types.ObjectId, ref: 'Vagas' },
}, { timestamps: true });

module.exports = model('Candidato', CandidatoSchema);