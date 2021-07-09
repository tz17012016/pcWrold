import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    subs,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.subs = subs;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

const handleQuery = asyncHandler(async (req, res, query) => {
  console.log(query);
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ $text: { $search: query } });
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('user', '_id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const handlePrice = asyncHandler(async (req, res, price) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Product.countDocuments({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    });
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('user', '_id name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .exec();

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    console.log(err);
  }
});

const handleCategory = asyncHandler(async (req, res, category) => {
  console.log(category);
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Product.countDocuments({ category });
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('user', '_id name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .exec();

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    console.log(err);
  }
});

const handleSub = asyncHandler(async (req, res, sub) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ subs: sub });
  const products = await Product.find({ subs: sub })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('user', '_id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const searchFilters = asyncHandler(async (req, res) => {
  const { query, price, category, sub } = req.body;
  console.log(query);

  if (query) {
    console.log('query --->', query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    console.log('price ---> ', price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log('category ---> ', category);
    await handleCategory(req, res, category);
  }

  if (sub) {
    console.log('sub ---> ', sub);
    await handleSub(req, res, sub);
  }
});

const getProductsByFilter = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || '';
  const category = req.query.category || '';
  const order = req.query.order || '';
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : { _id: -1 };
  const count = await Product.count({
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('user', '_id name')
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductsPopulated = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate('category')
    .populate('subs')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  searchFilters,
  getProductsByFilter,
  getProductsPopulated,
};
