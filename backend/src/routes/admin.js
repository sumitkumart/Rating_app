import { Router } from 'express';
import {
 createStore,
 createUser,
 getDashboardStats,
 listStores,
 listUsers,
} from '../controller/admincontroller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication + ADMIN role
router.use( requireAuth, requireRole( 'ADMIN' ) );

// Dashboard
router.get( '/dashboard', getDashboardStats );

// Users
router.get( '/users', listUsers );
router.post( '/users', createUser );

// Stores
router.get( '/stores', listStores );
router.post( '/stores', createStore );

export default router;
