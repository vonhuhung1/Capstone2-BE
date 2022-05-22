const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cronjobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    href: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 20000,
    },
    image: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cronjobSchema.plugin(toJSON);
cronjobSchema.plugin(paginate);

const CronJob = mongoose.model('CronJob', cronjobSchema);

module.exports = CronJob;
