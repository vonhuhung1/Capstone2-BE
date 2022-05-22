const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cronJobService } = require('../services');

const getCronJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cronJobService.queryCronJob(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getCronJob = catchAsync(async (req, res) => {
  const cronJob = await cronJobService.getCronJobById(req.params.cronjobId);
  if (!cronJob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cronJob not found');
  }
  res.status(httpStatus.OK).send(cronJob);
});

module.exports = { getCronJobs, getCronJob };
