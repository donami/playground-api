import mongoose from 'mongoose';

export const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
}
