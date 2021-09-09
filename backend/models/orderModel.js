import mongoose from 'mongoose';
import Joi from 'joi';
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export const validateOrder = (order) => {
  let schema = Joi.object({
    orderItems: Joi.array().items({
      name: Joi.string().required(),
      qty: Joi.number().integer().positive().required(),
      image: Joi.string().required(),
      price: Joi.number().positive().required(),
      product: Joi.string().alphanum().required(),
    }),
    shippingAddress: Joi.object().keys({
      address: Joi.string().required(),
      city: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }),
    paymentMethod: Joi.string(),
    paymentResult: Joi.object().keys({
      id: Joi.string().alphanum(),
      status: Joi.string(),
      update_time: Joi.string(),
      email_address: Joi.string(),
    }),
    taxPrice: Joi.number().default(0.0),
    shippingPrice: Joi.number().default(0.0),
    totalPrice: Joi.number().default(0.0),
    isPaid: Joi.boolean().default(false),
    paidAt: Joi.date().timestamp(),
    isDelivered: Joi.boolean().default(false),
    deliveredAt: Joi.date().timestamp(),
  });

  return schema.validate(order, { allowUnknown: true });
};
export default Order;
