import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RealBrandLogo from "./RealBrandLogo";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="professional-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <RealBrandLogo 
                store={{ name: 'RateLocal', category: 'Rating Platform' }} 
                size="large" 
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <span className="ml-4 text-2xl font-bold professional-text-gradient">RateLocal</span>
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/brands"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
            >
              Brands
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/signup"
                  className="professional-button px-6 py-2 text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
                  >
                    Admin Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                )}
                {user.role === "USER" && (
                  <Link
                    to="/stores"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
                  >
                    Browse Stores
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                )}
                {user.role === "OWNER" && (
                  <Link
                    to="/owner"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group"
                  >
                    My Stores
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                )}
                
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="professional-button-secondary px-4 py-2 text-sm font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="professional-button-secondary p-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

     
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="professional-container p-4 mt-4 space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link
                to="/brands"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 8h6m-6 4h6m-6 4h6" />
                </svg>
                Brands
              </Link>
              
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="professional-button w-full text-center px-4 py-3 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Admin Dashboard
                    </Link>
                  )}
                  {user.role === "USER" && (
                    <Link
                      to="/stores"
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Browse Stores
                    </Link>
                  )}
                  {user.role === "OWNER" && (
                    <Link
                      to="/owner"
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      My Stores
                    </Link>
                  )}
                  
                  <div className="px-4 py-3 border-t border-gray-200 mt-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="professional-button-secondary w-full text-center px-4 py-3 text-base font-medium text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
