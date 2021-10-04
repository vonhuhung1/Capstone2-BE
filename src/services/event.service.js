const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Event
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createEvent = async (userBody) => {
  return Event.create(userBody);
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
const queryEvents = async (filter, options) => {
  const events = await Event.paginate(filter, options);
  return events;
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEventById = async (id) => {
  return Event.findById(id).populate('authorId');
};

/**
 * Update event by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

/**
 * Delete event by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteEventById = async (userId) => {
  const event = await getEventById(userId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.remove();
  return event;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
