let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema(
  {
    name: String,
    bookId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
);

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;
