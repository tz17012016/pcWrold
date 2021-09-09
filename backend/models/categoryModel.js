import mongoose from 'mongoose';
import Joi from 'joi';
const categorySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export const validateCategory = (category) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(100).trim().required(),
    slug: Joi.string().regex(/^[a-z0-9-]+$/, 'must be a valid slug'),
  });

  return schema.validate(category);
};

export default Category;
