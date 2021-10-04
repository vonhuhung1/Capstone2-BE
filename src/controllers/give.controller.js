const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { giveService } = require('../services');

const createGive = catchAsync(async (req, res) => {
  const give = await giveService.createGive(req.body);
  res.status(httpStatus.CREATED).send(give);
});

const getGives = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await giveService.queryGives(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getGive = catchAsync(async (req, res) => {
  const give = await giveService.getGiveById(req.params.giveId);
  if (!give) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Give not found');
  }
  res.status(httpStatus.OK).send(give);
});

const updateGive = catchAsync(async (req, res) => {
  const give = await giveService.updateGiveById(req.params.giveId, req.body);
  res.status(httpStatus.OK).send(give);
});

const deleteGive = catchAsync(async (req, res) => {
  await giveService.deleteGiveById(req.params.giveId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGive,
  getGives,
  getGive,
  updateGive,
  deleteGive,
};
