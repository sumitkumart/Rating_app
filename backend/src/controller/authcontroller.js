import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { validateEmail, validatePassword, validateName, validateAddress } from "../utils/validator.js";

// POST /auth/signup
export async function signup( req, res ) {
 try {
  const { name, email, address, password, role } = req.body;

  if ( !validateName( name ) )
   return res.status( 400 ).json( { error: "Name must be 2-60 characters" } );
  if ( !validateEmail( email ) )
   return res.status( 400 ).json( { error: "Invalid email format" } );
  if ( !validatePassword( password ) )
   return res.status( 400 ).json( {
    error:
     "Password must be 8–16 chars, with at least one uppercase & one special character",
   } );
  if ( address && !validateAddress( address ) )
   return res.status( 400 ).json( { error: "Address must be 400 characters or less" } );

  const existing = await User.findOne( { where: { email } } );
  if ( existing ) return res.status( 400 ).json( { error: "Email already exists" } );

  const hash = await bcrypt.hash( password, 10 );
  const user = await User.create( {
   name,
   email,
   address,
   passwordHash: hash,
   role: role || "USER",
  } );

  res.json( { message: "User created", user } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// POST /auth/login
export async function login( req, res ) {
 try {
  const { email, password } = req.body;
  const user = await User.findOne( { where: { email } } );
  if ( !user ) return res.status( 401 ).json( { error: "Invalid credentials" } );

  const match = await bcrypt.compare( password, user.passwordHash );
  if ( !match ) return res.status( 401 ).json( { error: "Invalid credentials" } );

  const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET || 'your-secret-key-here', {
   expiresIn: "1d",
  } );

  res.json( { token, user } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}

// POST /auth/change-password
export async function changePassword( req, res ) {
 try {
  const { oldPassword, newPassword } = req.body;
  if ( !validatePassword( newPassword ) )
   return res.status( 400 ).json( { error: "New password is too weak" } );

  const user = req.user;
  const match = await bcrypt.compare( oldPassword, user.passwordHash );
  if ( !match ) return res.status( 400 ).json( { error: "Old password incorrect" } );

  user.passwordHash = await bcrypt.hash( newPassword, 10 );
  await user.save();

  res.json( { message: "Password updated successfully" } );
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}
