const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { uploadCloud, assignCloudinary } = require('../../config/cloudinary');

const router = express.Router();

router
  .route('/')
  .post(
    auth('user'),
    uploadCloud.fields([
      { name: 'frontCard', maxCount: 1 },
      { name: 'backCard', maxCount: 1 },
      { name: 'avatar', maxCount: 1 },
    ]),
    assignCloudinary,
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(auth('user'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('user'), validate(userValidation.getUser), userController.getUser)
  .patch(
    auth('user'),
    uploadCloud.fields([
      { name: 'frontCard', maxCount: 1 },
      { name: 'backCard', maxCount: 1 },
      { name: 'avatar', maxCount : 1},
    ]),
    assignCloudinary,
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(auth('admin'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
