import { Router } from 'express';
import {
 listStores,
 rateStore,
 getStore,
 getWeeklyTopRatedStore,
} from '../controller/storecontroller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public store listings for home page (no auth required)
router.get( '/', listStores );

// Public endpoint for weekly top-rated store (no auth required)
router.get( '/weekly-top-rated', getWeeklyTopRatedStore );

// Users must be logged in to see individual stores & rate them
router.use( requireAuth );

// Get single store details
router.get( '/:storeId', getStore );

// Rate or update rating
router.post( '/:storeId/rate', rateStore );

export default router;
