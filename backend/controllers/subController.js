import Sub from '../models/subModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

const createSubs = asyncHandler(async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log('SUB CREATE ERR ----->', err);
    res.status(400).send('Create sub failed');
  }
});

const listOfSubs = asyncHandler(async (req, res) =>
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec())
);

const readSubs = asyncHandler(async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate('category')
    .exec();

  res.json({
    sub,
    products,
  });
});

const updateSubs = asyncHandler(async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Sub update failed');
  }
});

const removeSubs = asyncHandler(async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Sub delete failed');
  }
});

export { createSubs, listOfSubs, readSubs, updateSubs, removeSubs };
