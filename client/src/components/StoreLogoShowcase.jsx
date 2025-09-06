import React from 'react';
import StoreLogo from './StoreLogo';
import RealBrandLogo from './RealBrandLogo';

const StoreLogoShowcase = ({ stores = [] }) => {
  // Sample stores data if none provided
  const sampleStores = [
    { id: 1, name: 'Nike', category: 'Sports & Fashion' },
    { id: 2, name: 'Adidas', category: 'Sports & Fashion' },
    { id: 3, name: 'McDonald\'s', category: 'Food & Beverage' },
    { id: 4, name: 'Burger King', category: 'Food & Beverage' },
    { id: 5, name: 'Domino\'s Pizza', category: 'Food & Beverage' },
    { id: 6, name: 'Starbucks', category: 'Coffee & Beverage' },
    { id: 7, name: 'Apple Store', category: 'Technology' },
    { id: 8, name: 'Samsung', category: 'Technology' },
    { id: 9, name: 'Google', category: 'Technology' },
    { id: 10, name: 'Amazon', category: 'Technology' },
    { id: 11, name: 'Facebook', category: 'Technology' },
    { id: 12, name: 'Instagram', category: 'Technology' },
    { id: 13, name: 'YouTube', category: 'Technology' },
    { id: 14, name: 'Netflix', category: 'Technology' },
    { id: 15, name: 'Spotify', category: 'Technology' },
    { id: 16, name: 'Tesla', category: 'Technology' },
    { id: 17, name: 'Zara', category: 'Fashion & Retail' },
    { id: 18, name: 'H&M', category: 'Fashion & Retail' },
    { id: 19, name: 'Panama', category: 'Fashion & Retail' },
    { id: 20, name: 'KFC', category: 'Food & Beverage' },
    { id: 21, name: 'Pizza Hut', category: 'Food & Beverage' },
    { id: 22, name: 'BMW', category: 'Automotive' },
    { id: 23, name: 'Mercedes-Benz', category: 'Automotive' },
    { id: 24, name: 'Audi', category: 'Automotive' }
  ];

  const displayStores = stores.length > 0 ? stores : sampleStores;

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold professional-text-gradient mb-4">
            All Brands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse collection of brands, each with their unique identity and services
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {displayStores.map((store, index) => (
            <div 
              key={store.id} 
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <RealBrandLogo store={store} size="large" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {store.name}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {store.category}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="professional-container p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Logo Design System
            </h3>
            <p className="text-gray-600 mb-6">
              Each store logo is carefully designed with category-specific icons and color schemes to create 
              a cohesive yet distinctive visual identity for every business in our platform.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded"></div>
                <span>Cafes & Restaurants</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded"></div>
                <span>Electronics & Tech</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded"></div>
                <span>Fashion & Style</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded"></div>
                <span>Garden & Home</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded"></div>
                <span>Books & Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-gray-500 to-gray-600 rounded"></div>
                <span>Other Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLogoShowcase;
