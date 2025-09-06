import { Op } from 'sequelize';
import { Rating, Store, User } from "../models/index.js";


export async function listStores( req, res ) {
 try {
  const { page = 1, limit = 10, category, search, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
  const offset = (page - 1) * limit;

  const whereClause = { isActive: true };
  if (category) whereClause.category = category;
  if (search) {
   whereClause[Op.or] = [
    { name: { [Op.like]: `%${search}%` } },
    { description: { [Op.like]: `%${search}%` } },
    { city: { [Op.like]: `%${search}%` } }
   ];
  }

  const stores = await Store.findAndCountAll({
   where: whereClause,
   include: [
    { 
     model: Rating, 
     attributes: ["rating", "UserId", "review", "createdAt"],
     include: [{ model: User, attributes: ["name"] }]
    },
    { model: User, as: 'owner', attributes: ["name", "email"] }
   ],
   limit: parseInt(limit),
   offset: parseInt(offset),
   order: [[sortBy, sortOrder.toUpperCase()]]
  });

  const result = stores.rows.map( ( store ) => {
   const ratings = store.Ratings.map( ( r ) => r.rating );
   const avg = ratings.length > 0 ? ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length : 0;
   const myRating = req.user ? store.Ratings.find( ( r ) => r.UserId === req.user.id ) : null;

   return { 
    ...store.toJSON(), 
    avgRating: Math.round(avg * 10) / 10, 
    totalRatings: ratings.length,
    myRating: myRating?.rating || null,
    myReview: myRating?.review || null
   };
  });

  res.json({ 
   stores: result, 
   totalCount: stores.count,
   totalPages: Math.ceil(stores.count / limit),
   currentPage: parseInt(page)
  });
 } catch ( err ) {
  res.status( 500 ).json( { error: err.message } );
 }
}


export async function rateStore( req, res ) {
 try {
  console.log("Rating request received:", { 
    storeId: req.params.storeId, 
    body: req.body, 
    user: req.user?.id 
  });
  
  const { storeId } = req.params;
  const { rating, review } = req.body;

  if (!rating || rating < 1 || rating > 5) {
   return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

 
  const store = await Store.findByPk(storeId);
  if (!store) {
   return res.status(404).json({ error: "Store not found" });
  }

  let existing = await Rating.findOne({
   where: { UserId: req.user.id, StoreId: storeId },
  });

  if (existing) {
   console.log("Updating existing rating:", existing.id);
   existing.rating = rating;
   existing.review = review || null;
   await existing.save();
   console.log("Rating updated successfully");
   return res.json({ message: "Rating updated", rating: existing });
  } else {
   console.log("Creating new rating for user:", req.user.id, "store:", storeId);
   const newRating = await Rating.create({
    UserId: req.user.id,
    StoreId: storeId,
    rating,
    review: review || null,
   });
   console.log("New rating created:", newRating.id);
   return res.json({ message: "Rating created", rating: newRating });
  }
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}

export async function getStore( req, res ) {
 try {
  const { storeId } = req.params;
  
  const store = await Store.findByPk(storeId, {
   include: [
    { 
     model: Rating, 
     attributes: ["rating", "review", "createdAt"],
     include: [{ model: User, attributes: ["name"] }]
    },
    { model: User, as: 'owner', attributes: ["name", "email"] }
   ]
  });

  if (!store) {
   return res.status(404).json({ error: "Store not found" });
  }

  const ratings = store.Ratings.map(r => r.rating);
  const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  const myRating = store.Ratings.find(r => r.UserId === req.user.id);

  res.json({
   ...store.toJSON(),
   avgRating: Math.round(avg * 10) / 10,
   totalRatings: ratings.length,
   myRating: myRating?.rating || null,
   myReview: myRating?.review || null
  });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}


export async function getWeeklyTopRatedStore(req, res) {
 try {

  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  console.log("Weekly top rated store - Date range:", { startOfWeek, endOfWeek });

  const stores = await Store.findAll({
   where: { isActive: true },
   include: [
    { 
     model: Rating, 
     where: {
      createdAt: {
       [Op.between]: [startOfWeek, endOfWeek]
      }
     },
     required: true, // Only include stores that have ratings this week
     attributes: ["rating", "UserId", "review", "createdAt"],
     include: [{ model: User, attributes: ["name"] }]
    },
    { model: User, as: 'owner', attributes: ["name", "email"] }
   ]
  });

  if (stores.length === 0) {
   return res.json({
    message: "No stores have received ratings this week yet.",
    topStore: null,
    weekRange: {
     start: startOfWeek,
     end: endOfWeek
    }
   });
  }


  const storesWithWeeklyRatings = stores.map(store => {
   const weeklyRatings = store.Ratings.map(r => r.rating);
   const avgRating = weeklyRatings.reduce((a, b) => a + b, 0) / weeklyRatings.length;
   
   return {
    ...store.toJSON(),
    weeklyAvgRating: Math.round(avgRating * 10) / 10,
    weeklyRatingCount: weeklyRatings.length,
    weeklyRatings: store.Ratings
   };
  });

  
  const topStore = storesWithWeeklyRatings.reduce((prev, current) => 
   (prev.weeklyAvgRating > current.weeklyAvgRating) ? prev : current
  );

  console.log("Top rated store this week:", topStore.name, "Rating:", topStore.weeklyAvgRating);

  res.json({
   message: `The highest-rated store this week is ${topStore.name} with an average rating of ${topStore.weeklyAvgRating} stars!`,
   topStore: {
    id: topStore.id,
    name: topStore.name,
    description: topStore.description,
    category: topStore.category,
    address: topStore.address,
    weeklyAvgRating: topStore.weeklyAvgRating,
    weeklyRatingCount: topStore.weeklyRatingCount,
    owner: topStore.owner
   },
   weekRange: {
    start: startOfWeek,
    end: endOfWeek
   }
  });

 } catch (err) {
  console.error("Error getting weekly top rated store:", err);
  res.status(500).json({ error: err.message });
 }
}
