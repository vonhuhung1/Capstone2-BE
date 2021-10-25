const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('user'), validate(commentValidation.createComment), commentController.createComment)
  .get(auth('user'), validate(commentValidation.getComments), commentController.getComments);

router
  .route('/:commentId')
  .get(auth('user'), validate(commentValidation.getComment), commentController.getComment)
  .patch(auth('user'), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth('user'), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;