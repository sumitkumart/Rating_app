import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import StoreLogo from "../components/StoreLogo";
import StoreLogoShowcase from "../components/StoreLogoShowcase";
import RealBrandLogo from "../components/RealBrandLogo";

const Home = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching stores...");
      const response = await api.get("/stores?limit=6");
      console.log("API Response:", response.data);
      setStores(response.data.stores || []);
      
      // Extract unique categories from stores
      const uniqueCategories = [...new Set(response.data.stores?.map(store => store.category).filter(Boolean) || [])];
      setCategories(uniqueCategories);
      console.log("Stores set:", response.data.stores || []);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setError("Failed to load stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      console.log("Searching for:", searchTerm);
      console.log("Selected category:", selectedCategory);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      
      const url = `/stores?${params.toString()}&limit=6`;
      console.log("Search URL:", url);
      
      const response = await api.get(url);
      console.log("Search response:", response.data);
      setStores(response.data.stores || []);
    } catch (error) {
      console.error("Error searching stores:", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStoreClick = (store) => {
    console.log("Store clicked:", store);
    navigate('/stores', { state: { scrollToStore: store.id } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div key={i} className="group relative transition-all duration-200 hover:scale-110">
          <svg className="w-4 h-4 text-yellow-400 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))' }}>
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="group relative transition-all duration-200 hover:scale-110">
          <svg className="w-4 h-4 text-yellow-400 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))' }}>
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <div key={`empty-${i}`} className="group relative transition-all duration-200 hover:scale-110">
          <svg className="w-4 h-4 text-gray-300 fill-current group-hover:text-yellow-300 transition-all duration-200" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="professional-hero mx-4 my-8 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="professional-badge mb-4 inline-block">
                🏆 Trusted by 10,000+ Users
              </span>
            </div>
            <h1 className="text-5xl font-bold professional-text-gradient sm:text-6xl md:text-7xl mb-8 leading-tight">
              Discover & Rate
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Local Excellence
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join our community of reviewers and discover the best local businesses in your area. 
              Share authentic experiences and help others make informed decisions.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="professional-container p-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search stores, categories, or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="professional-input w-full pl-12 pr-4 py-4 text-gray-700"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                  </div>
                  <div className="lg:w-64">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="professional-input w-full px-4 py-4 text-gray-700 focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSearch}
                      className="professional-button px-8 py-4 font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </button>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("");
                        fetchStores();
                      }}
                      className="professional-button-secondary px-6 py-4 font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold professional-text-gradient mb-6">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We make it easy to discover and rate local businesses with cutting-edge technology</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="professional-card p-8 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Reviews</h3>
              <p className="text-gray-600 leading-relaxed">Read genuine reviews from verified customers to make informed decisions about local businesses.</p>
            </div>
            
            <div className="professional-card p-8 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Discovery</h3>
              <p className="text-gray-600 leading-relaxed">Find the best local businesses with our AI-powered search and intelligent filtering system.</p>
            </div>
            
            <div className="professional-card p-8 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community First</h3>
              <p className="text-gray-600 leading-relaxed">Join a thriving community of reviewers and business owners working together for better experiences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stores Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold professional-text-gradient mb-6">Featured Stores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover top-rated businesses in your area, handpicked by our community</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="professional-card p-6">
                  <div className="professional-loading h-6 rounded-lg w-3/4 mb-4"></div>
                  <div className="professional-loading h-4 rounded-lg w-1/2 mb-2"></div>
                  <div className="professional-loading h-4 rounded-lg w-2/3 mb-4"></div>
                  <div className="professional-loading h-4 rounded-lg w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {console.log("Rendering stores section - stores:", stores, "loading:", loading, "error:", error)}
              {stores.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {stores.map((store, index) => (
                    <div 
                      key={store.id} 
                      className="professional-card p-6 slide-up cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group border-2 border-transparent hover:border-blue-200" 
                      style={{animationDelay: `${index * 0.1}s`}}
                      onClick={() => handleStoreClick(store)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                          {store.category && (
                            <span className="professional-badge">
                              {store.category}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <RealBrandLogo store={store} size="medium" clickable={true} />
                        </div>
                      </div>
                        
                      {store.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{store.description}</p>
                      )}
                        
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex space-x-1">
                            {renderStars(store.avgRating || 0)}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {store.avgRating ? store.avgRating.toFixed(1) : 'No ratings'}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            ({store.totalRatings || 0} reviews)
                          </span>
                        </div>
                      </div>
                        
                      {store.address && (
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{store.address}</span>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="professional-button-secondary w-full px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Click to Rate Store
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : stores.length === 0 && !error ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or explore different categories.</p>
                </div>
              ) : null}

              {error && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button 
                    onClick={fetchStores}
                    className="professional-button-secondary"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/stores"
              className="professional-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-3"
            >
              Explore All Stores
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Store Logo Showcase */}
      <StoreLogoShowcase stores={stores} />

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of reviewers who are helping their communities discover amazing local businesses. 
              Your voice matters and can help others make better decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="professional-button px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50"
              >
                Start Reviewing Today
              </Link>
              <Link
                to="/stores"
                className="professional-button-secondary px-8 py-4 text-lg font-semibold text-white border-white hover:bg-white hover:text-blue-600"
              >
                Browse Stores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
