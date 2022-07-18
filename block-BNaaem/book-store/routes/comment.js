var express = require('express');
var comment = require('../models/comment');
var router = express.Router();

//get single comment
router.get('/:id', (req, res, next) => {
  let id = req.params.id; //comment id
  Comment.findById(id, (err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ comment });
  });
  //find comment by id db.findbyid(id)
});

//create a comment
router.get('/new', (req, res, next) => {
  res.status(200).json('comment creation page');
});

//edit a comment
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id; // comment id
  Comment.findById(id, (err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ comment });
  });
  //find comment and update db.findbyidandupdate(id);
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id; // comment id
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ comment });
  });
  //find comment and update db.findbyidandupdate(id);
});

//delete

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({ comment });
  });
  //find comment by id and delete
});

module.exports = router;
