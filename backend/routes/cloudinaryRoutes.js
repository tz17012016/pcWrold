import express from 'express';
const router = express.Router();

// middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

// controllers
import {
  removeImages,
  uploadimages,
} from '../controllers/cloudinaryController.js';

router.route('/uploadimages').post(protect, admin, uploadimages);
router.route('/removeimage').post(protect, admin, removeImages);

export default router;
