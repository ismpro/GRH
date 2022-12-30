const { Schema, model } = require('mongoose');

const EntrevistaSchema = new Schema({
  candidato: { type: Schema.Types.ObjectId, ref: 'Candidato' },
  date: Date,
  local: String,
  notes: String,
  status: {
    type: String,
    enum: ['undone', 'done', 'cancel'],
    default: 'undone'
  }
}, { timestamps: true });

module.exports = model('Entrevista', EntrevistaSchema);