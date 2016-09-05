var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: {
    first: String,
    last: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number
  }
});


module.exports = mongoose.model('User', UserSchema);