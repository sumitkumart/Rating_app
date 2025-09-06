import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

export async function connectDB() {
 try {
  await sequelize.authenticate();
  console.log("Database connected successfully");
  await sequelize.sync( { force: false } );
  console.log("Database synced successfully");
  

  const { seedDatabase } = await import('../seed.js');
  await seedDatabase();
 } catch ( err ) {
  console.error("Database connection failed:", err);
  process.exit( 1 );
 }
}
