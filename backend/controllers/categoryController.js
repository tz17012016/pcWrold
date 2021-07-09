import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import Sub from '../models/subModel.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send('Create category failed');
  }
});

const listOfCategory = asyncHandler(async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec())
);

const readCategory = asyncHandler(async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category }).populate('category').exec();

  res.json({
    category,
    products,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Category update failed');
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Category delete failed');
  }
});
const getSubs = asyncHandler(async (req, res) => {
  await Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
});

export {
  createCategory,
  readCategory,
  listOfCategory,
  updateCategory,
  removeCategory,
  getSubs,
};
