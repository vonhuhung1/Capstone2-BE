const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const giveListSchema = mongoose.Schema(
  {
    commentId: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Give',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
giveListSchema.plugin(toJSON);
giveListSchema.plugin(paginate);

const GiveList = mongoose.model('GiveList', giveListSchema);

module.exports = GiveList;
