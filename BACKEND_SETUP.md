# 🚀 Backend Setup Guide

Follow these steps to set up and run the backend for the Gaming Café Slot Booking System.

## Step 1: Prerequisites

Before you start, ensure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas account** - [Create free account](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for cloning)

## Step 2: Set Up MongoDB Atlas

### 2.1 Create a Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login with your account
3. Click "Create" to create a new project
4. Click "Create a Deployment" and select **Free** tier
5. Choose cloud provider (AWS/Google Cloud/Azure) and region
6. Click "Create Deployment"

### 2.2 Create Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Enter username: `gaming_user`
4. Set a strong password (save it safely)
5. Click "Create Database User"

### 2.3 Get Connection String
1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Choose "Node.js" driver
5. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
6. Replace `<password>` with your database user password

## Step 3: Install Backend Dependencies

1. Open terminal/PowerShell
2. Navigate to the backend folder:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

## Step 4: Configure Environment Variables

1. In the `backend` folder, copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Open `.env` file and update:
```
MONGODB_URI=mongodb+srv://gaming_user:YOUR_PASSWORD@cluster_name.mongodb.net/crossplayy?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Replace:
- `YOUR_PASSWORD` - Your MongoDB database user password
- `cluster_name` - Your cluster name (from MongoDB Atlas)
- `your_super_secret_jwt_key_change_this_in_production` - A random secret string

## Step 5: Seed Database (Optional but Recommended)

To populate your database with sample stations and food items:

```bash
npm run seed
```

This will create:
- 8 PS5 gaming stations
- 6 Gaming PC stations
- 9 food items (beverages, snacks, meals, desserts)

## Step 6: Start the Backend Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
MongoDB Connected: cluster0.mongodb.net
Server running on http://localhost:5000
```

## Step 7: Test the API

Open your browser or use Postman to test:
```
GET http://localhost:5000/api/health
```

You should see:
```json
{
  "message": "Server is running"
}
```

## 📱 Frontend Integration

To connect your frontend to the backend, update the API base URL in your frontend code:

```javascript
const API_URL = 'http://localhost:5000/api';
```

## 🔑 Creating an Admin User (Optional)

To create an admin account, you need to modify the code. Here's how:

1. Register a normal user:
```bash
POST http://localhost:5000/api/auth/register

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "9876543210"
}
```

2. Use MongoDB Atlas UI to update the user:
- Go to Database → Collections → crossplayy → users
- Find your admin user and edit
- Change `isAdmin` from `false` to `true`
- Click "Update"

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseError: MongoDB connection failed`

**Solution:**
- Check MongoDB URI in `.env` is correct
- Ensure IP address is whitelisted in MongoDB Atlas (Network Access → Add Current IP)
- Verify cluster is running in MongoDB Atlas

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `.env` to another number (e.g., 5001)
- Or kill process using port 5000

### JWT Token Errors
**Error:** `Token is not valid` or `No token, authorization denied`

**Solution:**
- Make sure to include Authorization header: `Authorization: Bearer <token>`
- Tokens expire in 7 days - user needs to login again
- Check if JWT_SECRET in `.env` is correct

### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- CORS is already enabled in the backend
- Ensure frontend is making requests to correct URL
- Check if frontend runs on `http://localhost:3000` or similar

## 📚 API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

### Get All Stations
```bash
curl http://localhost:5000/api/stations
```

### Get Food Items
```bash
curl http://localhost:5000/api/food
```

## 📂 Backend File Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection config
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── models/
│   ├── User.js                  # User model
│   ├── Station.js               # Gaming station model
│   ├── Booking.js               # Booking model
│   └── Food.js                  # Food menu model
├── routes/
│   ├── auth.js                  # Auth endpoints
│   ├── stations.js              # Station endpoints
│   ├── bookings.js              # Booking endpoints
│   └── food.js                  # Food endpoints
├── server.js                    # Main server entry point
├── seed.js                      # Database seeding script
├── package.json                 # Dependencies
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
└── README.md                    # Backend README
```

## 🚀 Deploying to Production

When ready to deploy (Heroku, Railway, Render, etc.):

1. Set environment variables in deployment platform:
   - MONGODB_URI
   - JWT_SECRET
   - PORT
   - NODE_ENV=production

2. Ensure MongoDB is accessible from your deployment server

3. Update frontend API_URL to production server URL

## ✅ Next Steps

1. ✅ Backend is ready
2. Update frontend to use `http://localhost:5000/api` as API base URL
3. Test API endpoints with sample requests
4. Create admin user if needed
5. Deploy when ready

## 📞 Need Help?

Check the detailed README.md in the backend folder for:
- Complete API endpoint documentation
- Request/response examples
- More troubleshooting tips
