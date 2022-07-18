let express = require('express');
const Category = require('../models/Category');

let router = express.Router();

router.get('/allcategories', (req, res, next) => {
  Category.find()
    .distinct('name')
    .exec((err, result) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).json({ result });
    });
});

router.get('/:id/books', (req, res, next) => {
  Category.findById(id)
    .populate('bookId')
    .exec((err, result) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).json({ result });
    });
});

module.exports = router;
