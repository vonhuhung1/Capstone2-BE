const httpStatus = require('http-status');
const { Give } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Event
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createGive = async (userBody) => {
  return Give.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGives = async (filter, options) => {
  const events = await Give.paginate(filter, options);
  return events;
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getGiveById = async (id) => {
  return Give.findById(id).populate('authorId');
};

/**
 * Update event by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateGiveById = async (eventId, updateBody) => {
  const give = await getGiveById(eventId);
  if (!give) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(give, updateBody);
  await give.save();
  return give;
};

/**
 * Delete event by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteGiveById = async (userId) => {
  const give = await getGiveById(userId);
  if (!give) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await give.remove();
  return give;
};

module.exports = {
  createGive,
  queryGives,
  getGiveById,
  updateGiveById,
  deleteGiveById,
};
