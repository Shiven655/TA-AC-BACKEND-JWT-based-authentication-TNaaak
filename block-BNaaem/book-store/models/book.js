var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var bookSchema = new Schema(
  {
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    categories: [String],
    publish_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    numOfPages: { type: Number, required: true },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
