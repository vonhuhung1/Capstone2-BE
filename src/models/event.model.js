const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 20,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
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
      maxLength: 200,
    },
    authorId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'User',
    },
    give: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'GiveList',
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'CommentList',
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
