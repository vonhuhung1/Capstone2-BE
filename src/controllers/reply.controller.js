const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { replyService } = require('../services');

const createReplyComment = catchAsync(async (req, res) => {
  const reply = await replyService.createReplyComment(req.body);
  res.status(httpStatus.CREATED).send(reply);
});

const getReplyComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await replyService.queryReplyComment(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getReplyComment = catchAsync(async (req, res) => {
  const reply = await replyService.getCommentById(req.params.replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply Comment not found');
  }
  res.status(httpStatus.OK).send(reply);
});

const updateReplyComment = catchAsync(async (req, res) => {
  const reply = await replyService.updateCommentById(req.params.replyId, req.body);
  res.status(httpStatus.OK).send(reply);
});

const deleteReplyComment = catchAsync(async (req, res) => {
  await replyService.deleteReplyById(req.params.replyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReplyComment,
  getReplyComments,
  getReplyComment,
  updateReplyComment,
  deleteReplyComment,
};
