# Backend - Gaming Café Slot Booking System

This is the backend API for the Gaming Café Slot Booking System built with Express.js and MongoDB Atlas.

## 🚀 Features

- **User Authentication** - Register & Login with JWT tokens
- **Station Management** - Add, update, delete gaming stations
- **Booking Management** - Create, view, and cancel bookings
- **Food Menu** - Manage food items and add to bookings
- **Real-time Slot Availability** - Check available time slots
- **Admin Dashboard** - Manage all bookings and stations
- **Role-based Access Control** - Admin and user roles

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or pnpm

## 🔧 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas connection string and JWT secret:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crossplayy?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

## 🎯 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user with username and password
4. Get connection string and update in `.env`

## 🏃 Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Stations
- `GET /api/stations` - Get all stations
- `GET /api/stations/type/:type` - Get stations by type (ps5 or pc)
- `GET /api/stations/:id` - Get single station
- `POST /api/stations` - Create station (admin only)
- `PUT /api/stations/:id` - Update station (admin only)
- `DELETE /api/stations/:id` - Delete station (admin only)

### Bookings
- `GET /api/bookings/user/my-bookings` - Get user's bookings
- `GET /api/bookings/admin/all` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get single booking
- `GET /api/bookings/slots/:stationId/:date` - Get available slots
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking
- `DELETE /api/bookings/:id` - Delete booking (admin only)

### Food Menu
- `GET /api/food` - Get all food items
- `GET /api/food/category/:category` - Get food by category
- `GET /api/food/:id` - Get single food item
- `POST /api/food` - Create food item (admin only)
- `PUT /api/food/:id` - Update food item (admin only)
- `DELETE /api/food/:id` - Delete food item (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js               # JWT & admin authentication
├── models/
│   ├── User.js               # User schema
│   ├── Station.js            # Gaming station schema
│   ├── Booking.js            # Booking schema
│   └── Food.js               # Food item schema
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── stations.js           # Station management routes
│   ├── bookings.js           # Booking routes
│   └── food.js               # Food menu routes
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env.example              # Environment template
└── README.md                 # This file
```

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### Create Booking
```bash
POST /api/bookings
Content-Type: application/json
Authorization: Bearer <token>

{
  "stationId": "63f5c1a2b8d9e4f5g6h7i8j9",
  "date": "2024-05-20",
  "slots": ["14:00", "15:00", "16:00"],
  "stationType": "ps5",
  "pricePerHour": 200,
  "foodItems": [],
  "foodTotal": 0
}
```

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Check if MONGODB_URI is correct in `.env`
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify cluster is running

### JWT Token Expired
- Token expires in 7 days
- Users need to login again to get new token

### CORS Errors
- Ensure frontend and backend are on correct URLs
- Check CORS configuration in `server.js`

## 🚀 Deployment

To deploy on services like Heroku, Railway, or Render:

1. Push code to GitHub
2. Connect your repository to deployment platform
3. Set environment variables in platform dashboard
4. Deploy

## 📞 Support

For issues or questions, please check:
- API response messages
- Console logs for detailed errors
- MongoDB Atlas cluster status

## 📄 License

This project is part of a Full Stack Development coursework.
