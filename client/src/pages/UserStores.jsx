
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import StoreLogo from "../components/StoreLogo";
import RealBrandLogo from "../components/RealBrandLogo";

const UserStores = () => {
  const location = useLocation();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [ratingModal, setRatingModal] = useState({ isOpen: false, store: null });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchStores();
  }, [currentPage, sortBy, sortOrder]);

  // Handle scroll to specific store
  useEffect(() => {
    if (location.state?.scrollToStore) {
      const storeId = location.state.scrollToStore;
      setTimeout(() => {
        const element = document.getElementById(`store-${storeId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
          }, 3000);
        }
      }, 500);
    }
  }, [location.state, stores]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      console.log("Fetching stores...");
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        sortBy,
        sortOrder
      });
      
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      
      const response = await api.get(`/stores?${params.toString()}`);
      console.log("Stores response:", response.data);
      setStores(response.data.stores || []);
      setTotalPages(response.data.totalPages || 1);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.stores?.map(store => store.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching stores:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log("Search triggered with:", { searchTerm, selectedCategory });
    setCurrentPage(1);
    fetchStores();
  };

  const handleRating = async (storeId, ratingValue, reviewText) => {
    try {
      console.log("Submitting rating:", { storeId, ratingValue, reviewText });
      const response = await api.post(`/stores/${storeId}/rate`, {
        rating: ratingValue,
        review: reviewText
      });
      console.log("Rating response:", response.data);
      
      // Refresh stores to show updated ratings
      fetchStores();
      setRatingModal({ isOpen: false, store: null });
      setRating(0);
      setReview("");
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error rating store:", error);
      console.error("Error details:", error.response?.data);
      alert(`Failed to submit rating: ${error.response?.data?.error || error.message}`);
    }
  };

  const openRatingModal = (store) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log("Opening rating modal for store:", store);
    console.log("User token:", token ? "Present" : "Missing");
    console.log("User data:", user);
    
    setRatingModal({ isOpen: true, store });
    setRating(store.myRating || 0);
    setReview(store.myReview || "");
  };

  const renderStars = (rating, interactive = false, onStarClick = null, hoverRating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= rating;
      const isHovered = hoverRating > 0 && i <= hoverRating;
      
      stars.push(
        <button
          key={i}
          type="button"
          className={`w-8 h-8 p-1 transition-all duration-200 ${
            interactive ? 'cursor-pointer hover:scale-110' : ''
          } ${
            isActive || isHovered 
              ? 'text-yellow-400 transform scale-110' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={interactive && onStarClick ? () => onStarClick(i) : undefined}
          onMouseEnter={interactive && onStarClick ? () => onStarClick(i) : undefined}
          style={{
            filter: isActive || isHovered ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none'
          }}
        >
          <svg className="w-full h-full fill-current transition-all duration-200" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </button>
      );
    }
    return stars;
  };

  const renderStarsDisplay = (rating, store = null) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div 
          key={i} 
          className="group relative cursor-pointer transition-all duration-200 hover:scale-110"
          onClick={() => store && openRatingModal(store)}
        >
          <svg className="w-4 h-4 text-yellow-400 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))' }}>
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Click to review
          </div>
        </div>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div 
          key="half" 
          className="group relative cursor-pointer transition-all duration-200 hover:scale-110"
          onClick={() => store && openRatingModal(store)}
        >
          <svg className="w-4 h-4 text-yellow-400 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))' }}>
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Click to review
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <div 
          key={`empty-${i}`} 
          className="group relative cursor-pointer transition-all duration-200 hover:scale-110"
          onClick={() => store && openRatingModal(store)}
        >
          <svg className="w-4 h-4 text-gray-300 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Click to review
          </div>
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Stores</h1>
          <p className="mt-2 text-gray-600">Discover and rate local businesses in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search stores, categories, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt-DESC">Newest First</option>
                <option value="createdAt-ASC">Oldest First</option>
                <option value="avgRating-DESC">Highest Rated</option>
                <option value="avgRating-ASC">Lowest Rated</option>
                <option value="name-ASC">Name A-Z</option>
                <option value="name-DESC">Name Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setCurrentPage(1);
                fetchStores();
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Stores Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stores.map((store) => (
                <div key={store.id} id={`store-${store.id}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <RealBrandLogo store={store} size="small" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{store.name}</h3>
                          {store.category && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1 inline-block">
                              {store.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {store.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{store.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {renderStarsDisplay(store.avgRating || 0, store)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {store.avgRating ? store.avgRating.toFixed(1) : 'No ratings'} ({store.totalRatings || 0})
                        </span>
                      </div>
                    </div>
                    
                    {store.address && (
                      <p className="text-sm text-gray-500 flex items-center mb-4">
                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{store.address}</span>
                      </p>
                    )}
                    
                    <button
                      onClick={() => openRatingModal(store)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      {store.myRating ? 'Update Rating' : 'Rate Store'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === i + 1
                          ? 'text-white bg-blue-600'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}

        {!loading && stores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stores found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="neo-modal p-8 w-96 max-w-md mx-4">
            <div className="mt-3">
              <div className="flex items-center space-x-3 mb-4">
                <RealBrandLogo store={ratingModal.store} size="medium" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Rate {ratingModal.store?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{ratingModal.store?.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {renderStars(rating, true, setRating)}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="neo-input w-full px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
                  placeholder="Share your experience..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setRatingModal({ isOpen: false, store: null });
                    setRating(0);
                    setReview("");
                  }}
                  className="neo-button flex-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRating(ratingModal.store.id, rating, review)}
                  disabled={rating === 0}
                  className="neo-button flex-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ratingModal.store.myRating ? 'Update Rating' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStores;
