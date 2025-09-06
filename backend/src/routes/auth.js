import { Router } from 'express';
import { login, signup } from '../controller/authcontroller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Auth routes
router.post( '/signup', signup );
router.post( '/login', login );

// Example of protected route (change password)
import { changePassword } from '../controller/authcontroller.js';
router.post( '/change-password', requireAuth, changePassword );

export default router;
