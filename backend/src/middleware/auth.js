import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export async function requireAuth( req, res, next ) {
 const token = req.headers.authorization?.split( ' ' )[ 1 ];
 console.log("Auth middleware - token:", token ? "Present" : "Missing");
 
 if ( !token ) return res.status( 401 ).json( { error: 'No token provided' } );

 try {
  const decoded = jwt.verify( token, process.env.JWT_SECRET || 'your-secret-key-here' );
  console.log("Auth middleware - decoded token:", decoded);
  req.user = await User.findByPk( decoded.id );
  console.log("Auth middleware - user found:", req.user ? req.user.id : "Not found");
  if ( !req.user ) {
   console.log("Auth middleware - user not found for ID:", decoded.id);
   return res.status( 401 ).json( { error: 'User not found. Please login again.' } );
  }
  next();
 } catch (error) {
  console.log("Auth middleware - error:", error.message);
  res.status( 401 ).json( { error: 'Invalid token' } );
 }
}

export function requireRole( role ) {
 return ( req, res, next ) => {
  if ( req.user.role !== role ) {
   return res.status( 403 ).json( { error: 'Forbidden' } );
  }
  next();
 };
}
