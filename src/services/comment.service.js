const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Comment
 * @param {Object} userBody;
 * @returns {Promise<User>}
 */
const createComment = async (userBody) => {
  return Comment.create(userBody);
};

/**
 * Query for Comment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryComment = async (filter, options) => {
  const comment = await Comment.paginate(filter, options);
  return comment;
};

/**
 * Get Comment by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id).populate('authorId');
};

/**
 * Update Comment by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteCommentById = async (userId) => {
  const comment = await getCommentById(userId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  queryComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
