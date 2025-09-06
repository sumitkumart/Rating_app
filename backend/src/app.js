import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import ownerRoutes from './routes/owner.js';
import storeRoutes from './routes/store.js';

const app = express();
app.use( cors() );
app.use( express.json() );

// Routes
app.use( '/api/auth', authRoutes );
app.use( '/api/admin', adminRoutes );
app.use( '/api/stores', storeRoutes );
app.use( '/api/owner', ownerRoutes );

const PORT = process.env.PORT || 4000;

connectDB().then( () => {
 app.listen( PORT, () => {
  console.log( `Server running on http://localhost:${PORT}` );
 } );
} );
