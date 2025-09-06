# RateLocal - Professional Store Rating App

A comprehensive full-stack application for rating and reviewing local businesses. Built with React, Node.js, Express, and MySQL/PostgreSQL.

## 🚀 Features

### For Customers (Users)
- **Browse Stores**: Discover local businesses with advanced search and filtering
- **Rate & Review**: Leave detailed ratings and written reviews
- **Search & Filter**: Find stores by name, category, location, or rating
- **Pagination**: Smooth browsing experience with paginated results
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### For Business Owners
- **Store Management**: Create, edit, and delete store listings
- **Analytics Dashboard**: View ratings, reviews, and performance metrics
- **Review Management**: Monitor customer feedback and ratings
- **Multi-Store Support**: Manage multiple business locations

### For Administrators
- **User Management**: Oversee all users and their activities
- **Store Moderation**: Approve, edit, or remove store listings
- **Analytics**: Comprehensive platform statistics and insights
- **Content Management**: Moderate reviews and manage categories

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **Sequelize ORM** for database management
- **MySQL/PostgreSQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Vite** for build tooling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** or **PostgreSQL** database
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rating-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Database Configuration

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=rating_app
DB_USER=your_username
DB_PASSWORD=your_password
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=4000
NODE_ENV=development
```

### 4. Database Setup

Create the database and run migrations:

```bash
# For MySQL
mysql -u root -p
CREATE DATABASE rating_app;
exit

# Run the application to create tables
npm run dev
```

### 5. Frontend Setup

```bash
cd ../client
npm install
```

### 6. Environment Configuration

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:4000/api
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:4000`

2. **Start the Frontend Development Server**:
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Start the Backend**:
   ```bash
   cd backend
   npm start
   ```

## 📱 Usage

### Getting Started

1. **Visit the Application**: Open `http://localhost:5173` in your browser
2. **Create an Account**: Sign up as either a Customer or Business Owner
3. **Explore**: Browse stores, leave ratings, or manage your business listings

### User Roles

#### Customer (USER)
- Browse and search for stores
- Rate stores with 1-5 stars
- Write detailed reviews
- Filter by category, rating, or location

#### Business Owner (OWNER)
- Create and manage store listings
- View analytics and customer feedback
- Respond to reviews
- Manage multiple store locations

#### Administrator (ADMIN)
- Manage all users and stores
- Moderate content and reviews
- View platform analytics
- Configure system settings

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `passwordHash` - Encrypted password
- `address` - User's address
- `role` - USER, OWNER, or ADMIN
- `createdAt`, `updatedAt` - Timestamps

### Stores Table
- `id` - Primary key
- `name` - Store name
- `description` - Store description
- `email` - Store contact email
- `phone` - Store phone number
- `address` - Store address
- `city`, `state`, `zipCode` - Location details
- `website` - Store website URL
- `category` - Store category
- `ownerId` - Foreign key to Users table
- `isActive` - Store status
- `createdAt`, `updatedAt` - Timestamps

### Ratings Table
- `id` - Primary key
- `rating` - Rating value (1-5)
- `review` - Written review text
- `userId` - Foreign key to Users table
- `storeId` - Foreign key to Stores table
- `createdAt`, `updatedAt` - Timestamps

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password

### Stores
- `GET /api/stores` - Get all stores (with pagination, search, filters)
- `GET /api/stores/:id` - Get single store details
- `POST /api/stores/:id/rate` - Rate a store

### Owner Management
- `GET /api/owner/dashboard` - Get owner dashboard data
- `POST /api/owner/stores` - Create new store
- `PUT /api/owner/stores/:id` - Update store
- `DELETE /api/owner/stores/:id` - Delete store
- `GET /api/owner/stores/:id/ratings` - Get store ratings

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stores` - Get all stores
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Elements**: Smooth animations and hover effects
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant design patterns

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **Role-based Access**: Different permissions for different user types
- **CORS Protection**: Configured for secure cross-origin requests

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. **Set Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=4000
   DB_HOST=your_production_db_host
   DB_NAME=your_production_db_name
   DB_USER=your_production_db_user
   DB_PASSWORD=your_production_db_password
   JWT_SECRET=your_production_jwt_secret
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Connect your repository to Vercel/Netlify
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Set environment variable: `VITE_API_URL=your_backend_url`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Social media integration
- [ ] Photo uploads for stores and reviews
- [ ] Email notifications
- [ ] Advanced search with geolocation
- [ ] Review moderation tools
- [ ] API rate limiting
- [ ] Caching layer (Redis)

---

**RateLocal** - Connecting communities through honest reviews and ratings.


