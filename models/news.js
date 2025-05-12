let mongoose = require('mongoose');
const { DateTime } = require('luxon');

let Schema = mongoose.Schema;

let NewsSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  // category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  // qtyLikes: {type: Number},
  // author: {type: Schema.Types.ObjectId, ref: 'User'},
  src: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

NewsSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

NewsSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updated_at: new Date()});
  next();
});

NewsSchema.virtual('created_at_formatted').get(function() {
  return this.created_at ? DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATA_MED) : '';
});

module.exports = mongoose.model('News', NewsSchema);
