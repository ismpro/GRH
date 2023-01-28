const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: String,
  password: { type: String, set: (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(9)) },
  nome: String,
  type: {
    type: String,
    enum: ['trabalhador', 'manager'],
    default: 'manager'
  },
  /**
    * The id of the user session
    */
  atribuitesessionid: String
}, { timestamps: true });

userSchema.methods.validatePassword = function(compare) {
  return bcrypt.compareSync(compare, this.password);
};

module.exports = model('User', userSchema);