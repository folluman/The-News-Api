let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  password:{ type: String, required: true},
  phone: { type: Number, required: true},
});

UserSchema.virtual('url').get(function(){
  return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);