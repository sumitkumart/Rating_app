import { User, Store, Rating } from './models/index.js';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    // Check if users already exist
    const existingUsers = await User.count();
    if (existingUsers > 0) {
      console.log("Users already exist, skipping seed");
      return;
    }

    // Create sample users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'USER'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'USER'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'OWNER'
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'OWNER'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'ADMIN'
      }
    ]);

    // Create sample stores
    const stores = await Store.bulkCreate([
      {
        name: 'Pizza Palace',
        description: 'Best pizza in town with fresh ingredients and fast delivery',
        email: 'info@pizzapalace.com',
        phone: '+1-555-0123',
        address: '123 Main Street, Downtown',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        category: 'Restaurant',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Coffee Corner',
        description: 'Artisanal coffee and pastries in a cozy atmosphere',
        email: 'hello@coffeecorner.com',
        phone: '+1-555-0124',
        address: '456 Oak Avenue, Midtown',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        category: 'Cafe',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Tech Repair Hub',
        description: 'Professional computer and phone repair services',
        email: 'repair@techhub.com',
        phone: '+1-555-0125',
        address: '789 Tech Boulevard, Silicon Valley',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        category: 'Electronics',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Fashion Forward',
        description: 'Trendy clothing and accessories for all ages',
        email: 'style@fashionforward.com',
        phone: '+1-555-0126',
        address: '321 Fashion Street, Shopping District',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        category: 'Fashion',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Nike Store',
        description: 'Official Nike store with latest athletic wear and sneakers',
        email: 'store@nike.com',
        phone: '+1-555-0127',
        address: '100 Sports Avenue, Mall District',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        category: 'Fashion',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Zara Fashion',
        description: 'European fashion brand with contemporary clothing',
        email: 'info@zara.com',
        phone: '+1-555-0128',
        address: '200 Style Boulevard, Fashion District',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90211',
        category: 'Fashion',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'H&M Fashion',
        description: 'Affordable fashion for the whole family',
        email: 'store@hm.com',
        phone: '+1-555-0129',
        address: '300 Trend Street, Shopping Center',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        category: 'Fashion',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Adidas Store',
        description: 'Three stripes brand with athletic and lifestyle wear',
        email: 'store@adidas.com',
        phone: '+1-555-0130',
        address: '400 Athletic Drive, Sports Complex',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        category: 'Fashion',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Green Thumb Garden',
        description: 'Plants, seeds, and gardening supplies for your home',
        email: 'grow@greenthumb.com',
        phone: '+1-555-0127',
        address: '654 Garden Lane, Suburbs',
        city: 'Austin',
        state: 'TX',
        zipCode: '73301',
        category: 'Garden',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Book Nook',
        description: 'Independent bookstore with rare and new releases',
        email: 'books@booknook.com',
        phone: '+1-555-0128',
        address: '987 Library Street, Arts District',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        category: 'Books',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Burger King',
        description: 'Flame-grilled burgers and crispy fries',
        email: 'info@burgerking.com',
        phone: '+1-555-0129',
        address: '555 Fast Food Lane, Downtown',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        category: 'Restaurant',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Starbucks Coffee',
        description: 'Premium coffee and handcrafted beverages',
        email: 'contact@starbucks.com',
        phone: '+1-555-0130',
        address: '777 Coffee Drive, Business District',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        category: 'Cafe',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Best Buy Electronics',
        description: 'Latest electronics, computers, and home appliances',
        email: 'store@bestbuy.com',
        phone: '+1-555-0131',
        address: '888 Tech Plaza, Shopping Center',
        city: 'Dallas',
        state: 'TX',
        zipCode: '75201',
        category: 'Electronics',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Nike Store',
        description: 'Athletic shoes, clothing, and sports equipment',
        email: 'info@nike.com',
        phone: '+1-555-0132',
        address: '999 Sports Avenue, Mall District',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        category: 'Fashion',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Home Depot',
        description: 'Home improvement tools, materials, and garden supplies',
        email: 'help@homedepot.com',
        phone: '+1-555-0133',
        address: '111 Hardware Street, Industrial Area',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001',
        category: 'Garden',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Barnes & Noble',
        description: 'Books, magazines, and educational materials',
        email: 'store@barnesnoble.com',
        phone: '+1-555-0134',
        address: '222 Book Boulevard, University District',
        city: 'Boston',
        state: 'MA',
        zipCode: '02101',
        category: 'Books',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'McDonald\'s',
        description: 'Fast food burgers, fries, and breakfast items',
        email: 'info@mcdonalds.com',
        phone: '+1-555-0135',
        address: '333 Golden Arches Way, Highway Exit',
        city: 'Denver',
        state: 'CO',
        zipCode: '80201',
        category: 'Restaurant',
        ownerId: users[2].id,
        isActive: true
      },
      {
        name: 'Dunkin\' Donuts',
        description: 'Coffee, donuts, and breakfast sandwiches',
        email: 'contact@dunkin.com',
        phone: '+1-555-0136',
        address: '444 Donut Circle, Main Street',
        city: 'Philadelphia',
        state: 'PA',
        zipCode: '19101',
        category: 'Cafe',
        ownerId: users[3].id,
        isActive: true
      },
      {
        name: 'Apple Store',
        description: 'iPhone, iPad, Mac, and Apple accessories',
        email: 'store@apple.com',
        phone: '+1-555-0137',
        address: '555 Innovation Drive, Tech Center',
        city: 'San Jose',
        state: 'CA',
        zipCode: '95110',
        category: 'Electronics',
        ownerId: users[2].id,
        isActive: true
      }
    ]);

    // Create sample ratings
    await Rating.bulkCreate([
      {
        rating: 5,
        review: 'Amazing pizza! The crust is perfect and the toppings are fresh.',
        UserId: users[0].id,
        StoreId: stores[0].id
      },
      {
        rating: 4,
        review: 'Great coffee and friendly staff. A bit pricey but worth it.',
        UserId: users[0].id,
        StoreId: stores[1].id
      },
      {
        rating: 5,
        review: 'Fixed my laptop in no time! Very professional service.',
        UserId: users[1].id,
        StoreId: stores[2].id
      },
      {
        rating: 3,
        review: 'Good selection but sizes run small.',
        UserId: users[1].id,
        StoreId: stores[3].id
      },
      {
        rating: 4,
        review: 'Great plants and helpful staff. My garden looks amazing!',
        UserId: users[0].id,
        StoreId: stores[4].id
      },
      {
        rating: 5,
        review: 'Love this bookstore! Great selection and cozy atmosphere.',
        UserId: users[1].id,
        StoreId: stores[5].id
      },
      {
        rating: 4,
        review: 'Good burgers and fast service. Great value for money.',
        UserId: users[0].id,
        StoreId: stores[6].id
      },
      {
        rating: 5,
        review: 'Best coffee in town! Love their seasonal drinks.',
        UserId: users[1].id,
        StoreId: stores[7].id
      },
      {
        rating: 4,
        review: 'Great selection of electronics. Helpful staff.',
        UserId: users[0].id,
        StoreId: stores[8].id
      },
      {
        rating: 5,
        review: 'Excellent quality athletic wear. Worth the price.',
        UserId: users[1].id,
        StoreId: stores[9].id
      },
      {
        rating: 4,
        review: 'Everything I need for home improvement projects.',
        UserId: users[0].id,
        StoreId: stores[10].id
      },
      {
        rating: 5,
        review: 'Perfect place to study and find great books.',
        UserId: users[1].id,
        StoreId: stores[11].id
      },
      {
        rating: 3,
        review: 'Fast food is fast, but quality could be better.',
        UserId: users[0].id,
        StoreId: stores[12].id
      },
      {
        rating: 4,
        review: 'Good donuts and coffee. Quick breakfast option.',
        UserId: users[1].id,
        StoreId: stores[13].id
      },
      {
        rating: 5,
        review: 'Amazing Apple products and excellent customer service.',
        UserId: users[0].id,
        StoreId: stores[14].id
      }
    ]);

    console.log('Database seeded successfully!');
    console.log('Sample users created:', users.length);
    console.log('Sample stores created:', stores.length);
    console.log('Sample ratings created: 15');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
