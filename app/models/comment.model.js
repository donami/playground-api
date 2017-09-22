import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Promise from 'bluebird';
import mongooseDelete from 'mongoose-delete';

import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: String,
  body: String,
}, {
  timestamps: true,
});

CommentSchema.plugin(mongooseDelete);

CommentSchema.statics = {
  get(id) {
    return this.findById(id)
      .then((comment) => {
        if (comment) {
          return comment;
        }
        const err = new APIError('No such comment exists!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50, query = '' } = {}) {
    return this.find({
      name: new RegExp(query, 'i')
    })
    .sort({
      createdAt: -1
    })
    .skip(+skip)
    .limit(+limit)
    .exec();
  },

};

export default mongoose.model('Comment', CommentSchema);
