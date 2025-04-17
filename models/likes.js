let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LikeSchema = new Schema({
  news: {type: Schema.Types.ObjectId, ref: 'News',required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User',required: true},
  like: {type: Boolean},
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Likes', LikeSchema);
