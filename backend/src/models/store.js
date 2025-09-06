import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Store = sequelize.define( 'Store', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING( 120 ), allowNull: false },
 description: { type: DataTypes.TEXT },
 email: { type: DataTypes.STRING( 120 ), allowNull: false },
 phone: { type: DataTypes.STRING( 20 ) },
 address: { type: DataTypes.STRING( 400 ) },
 city: { type: DataTypes.STRING( 100 ) },
 state: { type: DataTypes.STRING( 100 ) },
 zipCode: { type: DataTypes.STRING( 20 ) },
 website: { type: DataTypes.STRING( 200 ) },
 imageUrl: { type: DataTypes.STRING( 500 ) },
 category: { type: DataTypes.STRING( 100 ) },
 ownerId: { type: DataTypes.INTEGER, allowNull: false },
 isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
 createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
} );
