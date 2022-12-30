const { Schema, model } = require('mongoose');

const TesteSchema = new Schema({
  candidato: { type: Schema.Types.ObjectId, ref: 'Candidato' },
  type: String,
  schedule: {
    date: Date,
    local: String,
  },
  score: Number,
  doneWhen: Date,
  status: {
    type: String,
    enum: ['undone', 'done', 'expired', 'cancel'],
    default: 'undone'
  }
}, { timestamps: true });

module.exports = model('Teste', TesteSchema);