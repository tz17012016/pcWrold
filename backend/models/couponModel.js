import mongoose from 'mongoose';
import Joi from 'joi';
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: 'name is required',
      minlength: [6, 'Too short'],
      maxlength: [12, 'Too long'],
    },
    expiry: {
      type: Date,
      required: 'expiry is required',
    },
    discount: {
      type: Number,
      required: 'discount is required',
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export const validateCoupon = (coupon) => {
  let schema = Joi.object({
    name: Joi.string().min(6).trim().uppercase().required(),
    expiry: Joi.date().required(),
    discount: Joi.number().positive().integer().min(1).max(99).required(),
  });

  return schema.validate(coupon);
};

export default Coupon;
