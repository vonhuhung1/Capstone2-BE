const httpStatus = require('http-status');
const { ReplyComment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Comment
 * @param {Object} userBody;
 * @returns {Promise<User>}
 */
const createReply = async (userBody) => {
  return ReplyComment.create(userBody);
};

/**
 * Query for Reply
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryReply = async (filter, options) => {
  const reply = await ReplyComment.paginate(filter, options);
  return reply;
};

/**
 * Get ReplyComment by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getReplyById = async (id) => {
  return ReplyComment.findById(id).populate('authorId');
};

/**
 * Update ReplyComment by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateReplyById = async (replyId, updateBody) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply Comment not found');
  }
  Object.assign(reply, updateBody);
  await reply.save();
  return reply;
};

/**
 * Delete Reply Comment by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteReplyById = async (userId) => {
  const reply = await getReplyById(userId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply Comment not found');
  }
  await reply.remove();
  return reply;
};

module.exports = {
  createReply,
  queryReply,
  getReplyById,
  updateReplyById,
  deleteReplyById,
};
