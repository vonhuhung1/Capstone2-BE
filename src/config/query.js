const { Token, User, Post, Event, CommentList, GiveList, Comment, Give, ReplyComment } = require('../models');

module.exports.argsConfig = [
  {
    $group: {
      _id: { $month: '$createdAt' },
      numberRecord: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      month: {
        $arrayElemAt: [
          [
            '',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          '$_id',
        ],
      },
      numberRecord: true,
    },
  },
];

module.exports.switchModel = (model) => {
  switch (model) {
    case 'token':
      return Token;

    case 'user':
      return User;

    case 'post':
      return Post;

    case 'event':
      return Event;

    case 'comment-list':
      return CommentList;

    case 'give-list':
      return GiveList;

    case 'comment':
      return Comment;

    case 'give':
      return Give;

    case 'reply-comment':
      return ReplyComment;

    default:
      break;
  }
};
