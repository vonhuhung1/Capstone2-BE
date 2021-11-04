const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { argsConfig, switchModel } = require('../config/query');

const getAnalysis = catchAsync(async (req, res) => {
  const result = await switchModel(req.params.switch).aggregate(argsConfig);
  res.status(httpStatus.CREATED).send({ result });
});

const getAnalysisById = catchAsync(async (req, res) => {
  const result = await [switchModel(req.params.switch)].aggregate(
    argsConfig({
      $match: {
        id: mongoose.Types.ObjectId(req.query.id),
      },
    })
  );
  res.status(httpStatus.CREATED).send({ result });
});

module.exports = {
  getAnalysis,
  getAnalysisById,
};
