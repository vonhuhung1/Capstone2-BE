const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 50,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 250,
    },
    status: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 100,
    },
    authorId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'User',
    },
    image: {
      type: [{ index: Number, path: String }],
    },
    startEvent: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    endEvent: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
