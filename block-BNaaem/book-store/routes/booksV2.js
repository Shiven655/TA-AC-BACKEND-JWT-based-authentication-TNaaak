var express = require('express');
var router = express.Router();

/* GET users listing. */
var express = require('express');
const Book = require('../models/book');
const Comment = require('../models/comment');
const Category = require('../models/Category');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  //find all books from db db.find({});
  Book.find({}, (err, books) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ books });
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ book });
  });
  //find a book from db by id
});

router.post('/', (req, res, next) => {
  //create a book db.create
  let bookCategory = req.body;
  Category.find({ name: bookCategory }, (err, category) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!category) {
      Category.create(req.body, (err, newCategory) => {
        if (err) {
          res.status(500);
          return next(err);
        }
      });
      Book.create(req.body, (err, book) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        Category.findByIdAndUpdate(
          id,
          { $push: { bookId: book.id } },
          (err, updatedCategory) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            return res.status(200).json({ book });
          }
        );
      });
    } else {
      Book.create(req.body, (err, book) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        Category.findByIdAndUpdate(
          id,
          { $push: { bookId: book.id } },
          (err, updatedCategory) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            res.status(200).json({ book });
          }
        );
      });
    }
  });
});

router.get(':id/edit', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (req, res, next) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(500).json({ book });
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ book });
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  //delete book db.findbyidanddelete(id)
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) {
      res.status(500);
      return next(err);
    }
  });
  res.status(200).json({ book });
});

router.get('/:id/comments', (req, res, next) => {
  let id = req.params.id;
  Comment.find({ bookId: id }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ comments });
  });
  //find all comments and list db.find({})
});

module.exports = router;
