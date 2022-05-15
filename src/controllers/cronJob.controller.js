const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { cronJobService } = require('../services');

const getCronJob = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cronJobService.queryCronJob(filter, options);
  res.status(httpStatus.OK).send(result);
});

module.exports = { getCronJob };
