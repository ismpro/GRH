const { Schema, model } = require('mongoose');

const EntrevistaSchema = new Schema({
  candidato: { type: Schema.Types.ObjectId, ref: 'Candidato' },
  data: Date,
  hora: String,
  local: String
}, { timestamps: true });

module.exports = model('Entrevista', EntrevistaSchema);