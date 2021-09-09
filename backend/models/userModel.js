import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      index: true,
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export const validateUser = (user) => {
  let schema = Joi.object().keys({
    name: Joi.string().min(2).max(32).trim().required(),
    email: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/))
      .min(6)
      .max(255)
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
      .min(6)
      .max(10)
      .trim()
      .required(),
    isAdmin: Joi.boolean().default(false).required(),
  });
  return schema.validate(user);
};
export const validateUserProfile = (user) => {
  let schema = Joi.object().keys({
    _id: Joi.string().alphanum().required(),
    name: Joi.string().min(2).max(32).trim().required(),
    email: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/))
      .min(6)
      .max(255)
      .email()
      .trim()
      .required(),
    isAdmin: Joi.boolean().default(false).required(),
  });
  return schema.validate(user);
};

export const validateWishlist = (wishlist) => {
  let schema = Joi.object()
    .keys({
      wishlist: Joi.array().items({ productId: Joi.string().alphanum() }),
    })
    .pattern(/./, Joi.any());

  return schema.validate(wishlist);
};

export default User;
