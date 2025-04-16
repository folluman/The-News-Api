let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NewsSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  qtyLikes: {type: Number},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
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

module.exports = mongoose.model('News', NewsSchema);
