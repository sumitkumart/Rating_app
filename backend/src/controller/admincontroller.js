import bcrypt from "bcryptjs";
import { Rating, Store, User } from "../models/index.js";

// GET /admin/dashboard
export async function getDashboardStats( req, res ) {
 try {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();

  res.json( { users, stores, ratings } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// GET /admin/users
export async function listUsers( req, res ) {
 try {
  const { q, role } = req.query;
  const where = {};
  if ( role ) where.role = role;
  if ( q ) where.name = { [ Op.iLike ]: `%${q}%` };

  const users = await User.findAll( { where } );
  res.json( users );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// POST /admin/users
export async function createUser( req, res ) {
 try {
  const { name, email, address, password, role } = req.body;

  const hash = await bcrypt.hash( password, 10 );
  const user = await User.create( {
   name,
   email,
   address,
   passwordHash: hash,
   role,
  } );

  res.json( { message: "User created", user } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// GET /admin/stores
export async function listStores( req, res ) {
 try {
  const stores = await Store.findAll( {
   include: [ { model: Rating, attributes: [ "rating" ] } ],
  } );

  // Compute avg rating
  const result = stores.map( ( store ) => {
   const ratings = store.Ratings.map( ( r ) => r.rating );
   const avg =
    ratings.length > 0
     ? ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length
     : null;
   return { ...store.toJSON(), avgRating: avg };
  } );

  res.json( result );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// POST /admin/stores
export async function createStore( req, res ) {
 try {
  const { name, email, address, ownerId } = req.body;
  const store = await Store.create( { name, email, address, ownerId } );
  res.json( { message: "Store created", store } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}
