const { CronJob } = require('../models');

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryCronJob = async (filter, options) => {
  const cronJob = await CronJob.paginate(filter, options);
  return cronJob;
};

const getCronJobById = async (id) => {
  return CronJob.findById(id);
};

module.exports = { queryCronJob, getCronJobById };
