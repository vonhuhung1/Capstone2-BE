const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const replyValidation = require('../../validations/reply.validation');
const replyController = require('../../controllers/reply.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('user'), validate(replyValidation.createReplyComment), replyController.createReplyComment)
  .get(auth('user'), validate(replyValidation.getReplyComments), replyController.getReplyComments);

router
  .route('/:replyId')
  .get(auth('user'), validate(replyValidation.getReplyComment), replyController.getReplyComment)
  .patch(auth('user'), validate(replyValidation.updateReplyComment), replyController.updateReplyComment)
  .delete(auth('user'), validate(replyValidation.deleteReplyComment), replyController.deleteReplyComment);

module.exports = router;
