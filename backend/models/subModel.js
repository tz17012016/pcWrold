import mongoose from 'mongoose';
import Joi from 'joi-oid';

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

const Sub = mongoose.model('Sub', subSchema);

export const validateSub = (sub) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(100).trim().required(),
    slug: Joi.string().regex(/^[a-z0-9-]+$/, 'must be a valid slug'),
    parent: Joi.objectId().required(),
  });

  return schema.validate(sub);
};
export default Sub;
