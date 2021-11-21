const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { giveValidation } = require('../../validations/index');
const { giveController } = require('../../controllers/index');
const { uploadCloud, assignCloudinary } = require('../../config/cloudinary');

const router = express.Router();

router
  .route('/')
  .post(
    auth('user'),
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(giveValidation.createGive),
    giveController.createGive
  )
  .get(auth('user'), validate(giveValidation.getGives), giveController.getGives);

router
  .route('/:giveId')
  .get(auth('user'), validate(giveValidation.getGive), giveController.getGive)
  .patch(
    auth('user'),
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(giveValidation.updateGive),
    giveController.updateGive
  )
  .delete(auth('user'), validate(giveValidation.deleteGive), giveController.deleteGive);

module.exports = router;
