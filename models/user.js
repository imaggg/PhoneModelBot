var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  model: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;