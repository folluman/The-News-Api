let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AdminSchema = new Schema({
  username: { type: String, required: true},
  password:{ type: String, required: true},
  email: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', AdminSchema);
