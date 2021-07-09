import express from 'express';
const router = express.Router();

// middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

// controller
import {
  createCategory,
  readCategory,
  listOfCategory,
  updateCategory,
  removeCategory,
  getSubs,
} from '../controllers/categoryController.js';

// routes
router.route('/').get(listOfCategory);
router.route('/category').post(protect, admin, createCategory);
router.route('/category/:slug').get(readCategory);
router.route('/category/:slug').put(protect, admin, updateCategory);
router.route('/category/:slug').delete(protect, admin, removeCategory);
router.route('/category/subs/:_id').get(getSubs);

export default router;
