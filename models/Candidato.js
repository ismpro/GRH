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
  cv: String,
  status: {
    type: String,
    enum: ['aprovado', 'reprovado','triagem', 'teste', 'decisao'],
    default: 'created'
  }
}, { timestamps: true });

module.exports = model('Candidato', CandidatoSchema);