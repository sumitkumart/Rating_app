import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define( 'User', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING( 60 ), allowNull: false },
 email: { type: DataTypes.STRING( 120 ), unique: true, allowNull: false },
 address: { type: DataTypes.STRING( 400 ) },
 passwordHash: { type: DataTypes.STRING( 120 ), allowNull: false },
 role: { type: DataTypes.ENUM( 'ADMIN', 'USER', 'OWNER' ), defaultValue: 'USER' }
} );
