import express from 'express';
const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';

import {
  createCategory,
  readCategory,
  listOfCategory,
  updateCategory,
  removeCategory,
  getSubs,
} from '../controllers/categoryController.js';

router.route('/').get(listOfCategory);
router.route('/category').post(protect, admin, createCategory);
router.route('/category/:slug').get(readCategory);
router.route('/category/:slug').put(protect, admin, updateCategory);
router.route('/category/:slug').delete(protect, admin, removeCategory);
router.route('/category/subs/:_id').get(getSubs);

export default router;
