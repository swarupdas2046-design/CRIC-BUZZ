import mongoose from "mongoose";

export const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};