import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Promise from 'bluebird';
import mongooseDelete from 'mongoose-delete';

import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: null,
  },
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    default: [],
  }],
  location: {
    city: String,
    address: String,
    formatted_address: String,
    lat: String,
    lng: String,
  },
  images: [{
    type: String,
    default: [],
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  rating: {
    type: Number,
    default: 3,
  },
  votes: [{
    value: Number,
  }],
}, {
  timestamps: true,
});

PlaygroundSchema.plugin(mongooseDelete);

PlaygroundSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate('equipments comments')
      .then((playground) => {
        if (playground) {
          return playground;
        }
        const err = new APIError('No such playground exists!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50, query = '' } = {}) {
    return this.find({
      name: new RegExp(query, 'i')
    })
    .populate('equipments comments')
    .sort({
      createdAt: -1
    })
    .skip(+skip)
    .limit(+limit)
    .exec();
  },

};

export default mongoose.model('Playground', PlaygroundSchema);
