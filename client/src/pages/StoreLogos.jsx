import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import StoreLogo from '../components/StoreLogo';
import RealBrandLogo from '../components/RealBrandLogo';

const StoreLogos = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchAllStores();
  }, []);

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stores?limit=100'); // Get all stores
      setStores(response.data.stores || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(stores.map(store => store.category).filter(Boolean))];
  const filteredStores = selectedCategory 
    ? stores.filter(store => store.category === selectedCategory)
    : stores;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="professional-hero mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold professional-text-gradient mb-6">
              All Brands
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our complete collection of brands. Each business has a unique visual identity 
              designed to represent their brand and category.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === '' 
                    ? 'professional-button' 
                    : 'professional-button-secondary'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'professional-button' 
                      : 'professional-button-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="professional-loading w-16 h-16 rounded-xl mx-auto mb-4"></div>
                <div className="professional-loading h-4 rounded w-3/4 mx-auto mb-2"></div>
                <div className="professional-loading h-3 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing {filteredStores.length} {selectedCategory ? `${selectedCategory.toLowerCase()} ` : ''}stores
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {filteredStores.map((store, index) => (
                <div 
                  key={store.id} 
                  className="text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <RealBrandLogo store={store} size="large" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize mb-2">
                    {store.category}
                  </p>
                  {store.avgRating && (
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-xs text-gray-600">
                        {store.avgRating.toFixed(1)} ({store.totalRatings})
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredStores.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
                <p className="text-gray-500">Try selecting a different category or check back later.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Back to Home */}
      <div className="text-center pb-16">
        <Link
          to="/"
          className="professional-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default StoreLogos;
