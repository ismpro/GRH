const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: String,
  password: { type: String, set: (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(9)) },
  username: String,
  type: {
    type: String,
    enum: ['candidato', 'trabalhador', 'manager'],
    default: 'candidato'
  }
}, { timestamps: true });

userSchema.methods.validatePassword = function(compare) {
  return bcrypt.compareSync(compare, this.password);
};

module.exports = model('User', userSchema);