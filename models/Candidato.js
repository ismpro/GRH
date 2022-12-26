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
    enum: ['aprovado', 'reprovado','triagem', 'teste', 'decisao'],
    default: 'created'
  },
  vaga: { type: Schema.Types.ObjectId, ref: 'Funcao' },
}, { timestamps: true });

module.exports = model('Candidato', CandidatoSchema);