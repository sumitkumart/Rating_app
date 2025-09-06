import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Rating = sequelize.define( 'Rating', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
 review: { type: DataTypes.TEXT },
 UserId: { type: DataTypes.INTEGER, allowNull: false },
 StoreId: { type: DataTypes.INTEGER, allowNull: false }
} );
