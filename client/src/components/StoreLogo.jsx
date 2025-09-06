import React from 'react';

const StoreLogo = ({ store, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-lg',
    large: 'w-16 h-16 text-2xl'
  };

  const getStoreLogo = (storeName, category) => {
    const name = storeName.toLowerCase();
    
    // Define logo configurations for each store
    const logoConfigs = {
      'coffee corner': {
        icon: '☕',
        gradient: 'from-amber-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600'
      },
      'tech repair hub': {
        icon: '🔧',
        gradient: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600'
      },
      'fashion forward': {
        icon: '👗',
        gradient: 'from-pink-500 to-rose-600',
        bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600'
      },
      'green thumb garden': {
        icon: '🌱',
        gradient: 'from-green-500 to-emerald-600',
        bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600'
      },
      'book nook': {
        icon: '📚',
        gradient: 'from-purple-500 to-violet-600',
        bgColor: 'bg-gradient-to-br from-purple-500 to-violet-600'
      },
      'burger king': {
        icon: '🍔',
        gradient: 'from-red-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-red-500 to-orange-600'
      },
      'starbucks coffee': {
        icon: '⭐',
        gradient: 'from-green-600 to-emerald-700',
        bgColor: 'bg-gradient-to-br from-green-600 to-emerald-700'
      },
      'best buy electronics': {
        icon: '💻',
        gradient: 'from-blue-600 to-cyan-600',
        bgColor: 'bg-gradient-to-br from-blue-600 to-cyan-600'
      },
      'nike store': {
        icon: '👟',
        gradient: 'from-gray-800 to-black',
        bgColor: 'bg-gradient-to-br from-gray-800 to-black'
      },
      'home depot': {
        icon: '🏠',
        gradient: 'from-orange-500 to-red-600',
        bgColor: 'bg-gradient-to-br from-orange-500 to-red-600'
      }
    };

    // Check for exact matches first
    if (logoConfigs[name]) {
      return logoConfigs[name];
    }

    // Fallback to category-based logos
    const categoryLogos = {
      'cafe': {
        icon: '☕',
        gradient: 'from-amber-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600'
      },
      'electronics': {
        icon: '🔧',
        gradient: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600'
      },
      'fashion': {
        icon: '👗',
        gradient: 'from-pink-500 to-rose-600',
        bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600'
      },
      'garden': {
        icon: '🌱',
        gradient: 'from-green-500 to-emerald-600',
        bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600'
      },
      'books': {
        icon: '📚',
        gradient: 'from-purple-500 to-violet-600',
        bgColor: 'bg-gradient-to-br from-purple-500 to-violet-600'
      },
      'restaurant': {
        icon: '🍽️',
        gradient: 'from-red-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-red-500 to-orange-600'
      }
    };

    // Return category-based logo or default
    return categoryLogos[category?.toLowerCase()] || {
      icon: '🏪',
      gradient: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-500 to-gray-600'
    };
  };

  const logo = getStoreLogo(store.name, store.category);

  return (
    <div className={`${sizeClasses[size]} ${logo.bgColor} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <span className="text-white font-bold drop-shadow-sm">
        {logo.icon}
      </span>
    </div>
  );
};

export default StoreLogo;
