const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const giveSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: Boolean,
      required: true,
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
