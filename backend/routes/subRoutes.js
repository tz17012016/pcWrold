import express from 'express';
const router = express.Router();

// middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

// controller
import {
  listOfSubs,
  createSubs,
  readSubs,
  updateSubs,
  removeSubs,
} from '../controllers/subController.js';

// routes
router.route('/').get(listOfSubs);
router.route('/sub').post(protect, admin, createSubs);
router
  .route('/sub/:slug')
  .get(readSubs)
  .put(protect, admin, updateSubs)
  .delete(protect, admin, removeSubs);

export default router;
