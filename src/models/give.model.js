const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const giveSchema = mongoose.Schema(
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
      ref: 'User',
    },
    image: {
      type: [{ index: Number, path: String }],
    },
    give: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'GiveList',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
giveSchema.plugin(toJSON);
giveSchema.plugin(paginate);

const Give = mongoose.model('Give', giveSchema);

module.exports = Give;
