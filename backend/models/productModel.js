import Joi from 'joi';
import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: 'Name is required',
      text: true,
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: 'Brand is required',
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub',
      },
    ],
    description: {
      type: String,
      required: 'description is required',
      text: true,
      minlength: [2, 'Too short'],
      maxlength: [5000, 'Too long'],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export const validateUser = (user) => {
  let schema = Joi.object().keys({
    name: Joi.string().min(2).max(100).required('Name is required'),
    image: Joi.string().required('Image is required'),
    price: Joi.number().required('Price is required'),
    brand: Joi.string().required('brand is required'),
    category: Joi.objectId().required('category id is required'),
    subs: Joi.objectId().required('category id is required'),
    description: Joi.string().min(2).max(100).required('subs is required'),
    countInStock: Joi.number().required('countInStock is required'),
  });
  return schema.validate(user);
};
export const validatReview = (user) => {
  let schema = Joi.object().keys({
    name: Joi.string().min(2).max(100).required('Name is required'),
    rating: Joi.number().required('rating is required'),
    comment: Joi.string().min(2).max(100).required('comment is required'),
  });
  return schema.validate(user);
};
export default Product;
