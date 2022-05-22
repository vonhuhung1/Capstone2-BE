const express = require('express');
const cronJobController = require('../../controllers/cronJob.controller');

const router = express.Router();

router.route('/').get(cronJobController.getCronJobs);

router.route('/:cronjobId').get(cronJobController.getCronJob);
module.exports = router;
