import { Op } from 'sequelize';
import { Rating, Store, User } from "../models/index.js";

// GET /owner/dashboard
export async function getOwnerDashboard( req, res ) {
 try {
  const stores = await Store.findAll({
   where: { ownerId: req.user.id },
   include: [
    { 
     model: Rating, 
     attributes: ["rating", "review", "createdAt"],
     include: [{ model: User, attributes: ["name"] }]
    }
   ],
   order: [['createdAt', 'DESC']]
  });

  const storesWithStats = stores.map(store => {
   const ratings = store.Ratings.map(r => r.rating);
   const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
   
   const recentRatings = store.Ratings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map(r => ({
     userName: r.User.name,
     rating: r.rating,
     review: r.review,
     createdAt: r.createdAt
    }));

   return {
    ...store.toJSON(),
    avgRating: Math.round(avg * 10) / 10,
    totalRatings: ratings.length,
    recentRatings
   };
  });

  res.json({ stores: storesWithStats });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}

// POST /owner/stores
export async function createStore( req, res ) {
 try {
  const { name, description, email, phone, address, city, state, zipCode, website, category } = req.body;

  if (!name || !email) {
   return res.status(400).json({ error: "Name and email are required" });
  }

  const store = await Store.create({
   name,
   description,
   email,
   phone,
   address,
   city,
   state,
   zipCode,
   website,
   category,
   ownerId: req.user.id
  });

  res.status(201).json({ message: "Store created successfully", store });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}

// PUT /owner/stores/:storeId
export async function updateStore( req, res ) {
 try {
  const { storeId } = req.params;
  const updateData = req.body;

  const store = await Store.findOne({
   where: { id: storeId, ownerId: req.user.id }
  });

  if (!store) {
   return res.status(404).json({ error: "Store not found" });
  }

  await store.update(updateData);
  res.json({ message: "Store updated successfully", store });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}

// DELETE /owner/stores/:storeId
export async function deleteStore( req, res ) {
 try {
  const { storeId } = req.params;

  const store = await Store.findOne({
   where: { id: storeId, ownerId: req.user.id }
  });

  if (!store) {
   return res.status(404).json({ error: "Store not found" });
  }

  await store.destroy();
  res.json({ message: "Store deleted successfully" });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}

// GET /owner/stores/:storeId/ratings
export async function getStoreRatings( req, res ) {
 try {
  const { storeId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const store = await Store.findOne({
   where: { id: storeId, ownerId: req.user.id }
  });

  if (!store) {
   return res.status(404).json({ error: "Store not found" });
  }

  const ratings = await Rating.findAndCountAll({
   where: { storeId },
   include: [{ model: User, attributes: ["name", "email"] }],
   limit: parseInt(limit),
   offset: parseInt(offset),
   order: [['createdAt', 'DESC']]
  });

  res.json({
   ratings: ratings.rows,
   totalCount: ratings.count,
   totalPages: Math.ceil(ratings.count / limit),
   currentPage: parseInt(page)
  });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}
