import { Router } from 'express';
import { 
 getOwnerDashboard, 
 createStore, 
 updateStore, 
 deleteStore, 
 getStoreRatings 
} from '../controller/ownercontroller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// All owner routes require authentication + OWNER role
router.use( requireAuth, requireRole( 'OWNER' ) );

// Dashboard: average rating + list of users who rated
router.get( '/dashboard', getOwnerDashboard );

// Store management
router.post( '/stores', createStore );
router.put( '/stores/:storeId', updateStore );
router.delete( '/stores/:storeId', deleteStore );

// Store ratings
router.get( '/stores/:storeId/ratings', getStoreRatings );

export default router;
