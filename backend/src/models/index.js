import { Rating } from './rating.js';
import { Store } from './store.js';
import { User } from './User.js';

// Associations
User.hasMany( Rating, { foreignKey: 'UserId', onDelete: 'CASCADE' } );
Rating.belongsTo( User, { foreignKey: 'UserId' } );

Store.hasMany( Rating, { foreignKey: 'StoreId', onDelete: 'CASCADE' } );
Rating.belongsTo( Store, { foreignKey: 'StoreId' } );

User.hasMany( Store, { foreignKey: 'ownerId', as: 'ownedStores' } );
Store.belongsTo( User, { foreignKey: 'ownerId', as: 'owner' } );

export { Rating, Store, User };

