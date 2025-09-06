import React from 'react';
import { useNavigate } from 'react-router-dom';

const RealBrandLogo = ({ store, size = 'medium', className = '', clickable = true }) => {
  const navigate = useNavigate();
  // Brand logo mapping with real brand names and their corresponding logos
  const brandLogos = {
    // Sports & Fashion Brands
    'nike': {
      name: 'Nike',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      color: '#000000',
      category: 'Sports & Fashion',
      emoji: '👟'
    },
    'adidas': {
      name: 'Adidas',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      color: '#000000',
      category: 'Sports & Fashion'
    },
    'puma': {
      name: 'Puma',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Puma_AG_Logo.svg',
      color: '#000000',
      category: 'Sports & Fashion'
    },
    'campus': {
      name: 'Campus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
      color: '#FF6B35',
      category: 'Sports & Fashion'
    },
    
    // Food & Beverage Brands
    'mcdonalds': {
      name: "McDonald's",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg',
      color: '#FFC72C',
      category: 'Food & Beverage',
      emoji: '🍔'
    },
    'burger king': {
      name: 'Burger King',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Burger_King_Logo.svg',
      color: '#FF6B35',
      category: 'Food & Beverage'
    },
    'dominos': {
      name: "Domino's Pizza",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Domino%27s_pizza_logo.svg',
      color: '#E31837',
      category: 'Food & Beverage'
    },
    'kfc': {
      name: 'KFC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/KFC_logo.svg/512px-KFC_logo.svg.png',
      color: '#E4002B',
      category: 'Food & Beverage'
    },
    'pizza hut': {
      name: 'Pizza Hut',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Pizza_Hut_1967-1999_logo.svg/512px-Pizza_Hut_1967-1999_logo.svg.png',
      color: '#FF6B35',
      category: 'Food & Beverage'
    },
    'subway': {
      name: 'Subway',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Subway_restaurant_logo.svg/512px-Subway_restaurant_logo.svg.png',
      color: '#009639',
      category: 'Food & Beverage'
    },
    
    // Technology Brands
    'apple': {
      name: 'Apple Store',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      color: '#000000',
      category: 'Technology'
    },
    'samsung': {
      name: 'Samsung',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      color: '#1428A0',
      category: 'Technology'
    },
    'microsoft': {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      color: '#00BCF2',
      category: 'Technology'
    },
    'google': {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      color: '#4285F4',
      category: 'Technology'
    },
    'amazon': {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      color: '#FF9900',
      category: 'Technology'
    },
    'meta': {
      name: 'Meta (Facebook)',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png',
      color: '#1877F2',
      category: 'Technology'
    },
    'facebook': {
      name: 'Facebook',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png',
      color: '#1877F2',
      category: 'Technology'
    },
    'instagram': {
      name: 'Instagram',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png',
      color: '#E4405F',
      category: 'Technology'
    },
    'twitter': {
      name: 'Twitter',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png',
      color: '#1DA1F2',
      category: 'Technology'
    },
    'youtube': {
      name: 'YouTube',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png',
      color: '#FF0000',
      category: 'Technology'
    },
    'netflix': {
      name: 'Netflix',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png',
      color: '#E50914',
      category: 'Technology'
    },
    'spotify': {
      name: 'Spotify',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Spotify-Logo.png',
      color: '#1DB954',
      category: 'Technology'
    },
    'tesla': {
      name: 'Tesla',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Tesla-Logo.png',
      color: '#000000',
      category: 'Technology'
    },
    
    // Fashion & Retail
    'zara': {
      name: 'Zara',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Zara-Logo.png',
      color: '#000000',
      category: 'Fashion & Retail'
    },
    'h&m': {
      name: 'H&M',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png',
      color: '#E5001A',
      category: 'Fashion & Retail'
    },
    'uniqlo': {
      name: 'Uniqlo',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Uniqlo-Logo.png',
      color: '#FF6B35',
      category: 'Fashion & Retail'
    },
    'panama': {
      name: 'Panama',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Panama-Logo.png',
      color: '#FF6B35',
      category: 'Fashion & Retail'
    },
    
    // Coffee & Beverage
    'starbucks': {
      name: 'Starbucks',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Starbucks-Logo.png',
      color: '#00704A',
      category: 'Coffee & Beverage'
    },
    'costa': {
      name: 'Costa Coffee',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Costa-Coffee-Logo.png',
      color: '#E4002B',
      category: 'Coffee & Beverage'
    },
    
    // Electronics & Appliances
    'sony': {
      name: 'Sony',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png',
      color: '#000000',
      category: 'Electronics'
    },
    'lg': {
      name: 'LG',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/LG-Logo.png',
      color: '#A50034',
      category: 'Electronics'
    },
    
    // Automotive
    'bmw': {
      name: 'BMW',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png',
      color: '#0066CC',
      category: 'Automotive'
    },
    'mercedes': {
      name: 'Mercedes-Benz',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Logo.png',
      color: '#000000',
      category: 'Automotive'
    },
    'audi': {
      name: 'Audi',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Audi-Logo.png',
      color: '#BB0A30',
      category: 'Automotive'
    },
    'toyota': {
      name: 'Toyota',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Logo.png',
      color: '#EB0A1E',
      category: 'Automotive'
    },
    'honda': {
      name: 'Honda',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Honda-Logo.png',
      color: '#000000',
      category: 'Automotive'
    }
  };

  // Function to find matching brand
  const findMatchingBrand = (storeName) => {
    const name = storeName.toLowerCase().trim();
    
    // Direct match
    if (brandLogos[name]) {
      return brandLogos[name];
    }
    
    // Partial match
    for (const [key, brand] of Object.entries(brandLogos)) {
      if (name.includes(key) || key.includes(name)) {
        return brand;
      }
    }
    
    // Category-based fallback
    const category = store.category?.toLowerCase();
    if (category) {
      for (const [key, brand] of Object.entries(brandLogos)) {
        if (brand.category.toLowerCase().includes(category) || category.includes(brand.category.toLowerCase())) {
          return brand;
        }
      }
    }
    
    return null;
  };

  const brand = findMatchingBrand(store.name);
  
  // Size configurations
  const sizeConfig = {
    small: { width: 'w-8', height: 'h-8', text: 'text-xs' },
    medium: { width: 'w-12', height: 'h-12', text: 'text-sm' },
    large: { width: 'w-16', height: 'h-16', text: 'text-base' },
    xlarge: { width: 'w-20', height: 'h-20', text: 'text-lg' }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  const handleClick = () => {
    if (clickable && store) {
      navigate('/stores', { state: { scrollToStore: store.id } });
    }
  };

  if (brand) {
    return (
      <div 
        className={`${config.width} ${config.height} ${className} group relative ${clickable ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
      >
        <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-lg border-2 border-gray-100 group-hover:border-gray-200 transition-all duration-200 group-hover:shadow-xl">
          <img
            src={brand.logo}
            alt={`${brand.name} Logo`}
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            onError={(e) => {
              // Fallback to brand name if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            onLoad={(e) => {
              // Hide fallback when image loads successfully
              e.target.nextSibling.style.display = 'none';
            }}
          />
          <div 
            className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
            style={{ backgroundColor: brand.color + '20' }}
          >
            <div className="text-center">
              <div className={`${config.text} font-bold text-gray-700 mb-1`}>
                {brand.emoji || brand.name.charAt(0)}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {brand.name}
              </div>
            </div>
          </div>
        </div>
        
        {/* Brand name tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
          {clickable ? `Click to rate ${brand.name}` : brand.name}
        </div>
      </div>
    );
  }

  // Fallback for unknown brands
  return (
    <div 
      className={`${config.width} ${config.height} ${className} group relative ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg border-2 border-gray-100 group-hover:border-gray-200 transition-all duration-200 group-hover:shadow-xl">
        <div className="w-full h-full flex items-center justify-center text-white font-bold">
          <div className="text-center">
            <div className={`${config.text} mb-1`}>
              {store.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs opacity-80 font-medium">
              {store.name}
            </div>
          </div>
        </div>
      </div>
      
      {/* Store name tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {clickable ? `Click to rate ${store.name}` : store.name}
      </div>
    </div>
  );
};

export default RealBrandLogo;
