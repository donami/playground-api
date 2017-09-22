import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Promise from 'bluebird';
import mongooseDelete from 'mongoose-delete';

import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: String,
  image: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

EquipmentSchema.plugin(mongooseDelete);

EquipmentSchema.statics = {
  get(id) {
    return this.findById(id)
      .then((equipment) => {
        if (equipment) {
          return equipment;
        }
        const err = new APIError('No such equipment exists!', httpStatus.NOT_FOUND, true);
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

export default mongoose.model('Equipment', EquipmentSchema);
