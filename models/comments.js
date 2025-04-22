let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CommentsSchema = new Schema ({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  news: { type: Schema.Types.ObjectId, ref: 'News', required: true},
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Comments', CommentsSchema);
