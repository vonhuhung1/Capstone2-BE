const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const analysisController = require('../../controllers/analysis.controller');

const router = express.Router();

router.route('/:switch').get(/* auth('getUsers'), validate(userValidation.getUsers), */ analysisController.getAnalysis);

module.exports = router;
