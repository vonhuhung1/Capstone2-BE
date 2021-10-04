const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router
  .route('/')
  .post(/* auth('admin'), */ validate(eventValidation.createEvent), eventController.createEvent)
  .get(auth('user'), validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:eventId')
  .get(auth('user'), validate(eventValidation.getEvent), eventController.getEvent)
  .patch(auth('user'), validate(eventValidation.updateUser), eventController.updateEvent)
  .delete(auth('user'), validate(eventValidation.deleteUser), eventController.deleteEvent);

module.exports = router;
