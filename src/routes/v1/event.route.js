const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');
const { uploadCloud, assignCloudinary } = require('../../config/cloudinary');

const router = express.Router();

router
  .route('/')
  .post(
    auth('user'),
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(eventValidation.createEvent),
    eventController.createEvent
  )
  .get(auth('user'), validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:eventId')
  .get(auth('user'), validate(eventValidation.getEvent), eventController.getEvent)
  .patch(
    auth('user'),
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(eventValidation.updateEvent),
    eventController.updateEvent
  )
  .delete(auth('user'), validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
