# 📋 API Reference Guide

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "63f5c1a2b8d9e4f5g6h7i8j9",
    "username": "john_doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "63f5c1a2b8d9e4f5g6h7i8j9",
    "username": "john_doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

### Get User Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "63f5c1a2b8d9e4f5g6h7i8j9",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "isAdmin": false,
    "bookings": [...]
  }
}
```

### Update User Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "phone": "9876543210",
  "email": "newemail@example.com"
}

Response:
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

---

## 🎮 Station Endpoints

### Get All Stations
```
GET /stations

Response:
{
  "stations": [
    {
      "_id": "63f5c1a2b8d9e4f5g6h7i8j9",
      "name": "PS5 Station 01",
      "type": "ps5",
      "price": 200,
      "status": "available",
      "specs": ["4K Display", "DualSense Controller", "Premium Audio"],
      "image": "https://...",
      "createdAt": "2024-01-01T10:00:00Z"
    },
    ...
  ]
}
```

### Get Stations by Type
```
GET /stations/type/ps5
GET /stations/type/pc

Response:
{
  "stations": [...]
}
```

### Get Single Station
```
GET /stations/:id

Response:
{
  "station": {
    "_id": "63f5c1a2b8d9e4f5g6h7i8j9",
    "name": "PS5 Station 01",
    "type": "ps5",
    "price": 200,
    ...
    "bookings": [...]
  }
}
```

### Create Station (Admin Only)
```
POST /stations
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "name": "PS5 Station 09",
  "type": "ps5",
  "price": 200,
  "specs": ["4K Display", "DualSense Controller"],
  "image": "https://...",
  "description": "Latest PS5 station",
  "location": "Gaming Zone A"
}

Response:
{
  "message": "Station created successfully",
  "station": {...}
}
```

### Update Station (Admin Only)
```
PUT /stations/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "price": 250,
  "status": "maintenance"
}

Response:
{
  "message": "Station updated successfully",
  "station": {...}
}
```

### Delete Station (Admin Only)
```
DELETE /stations/:id
Authorization: Bearer <admin_token>

Response:
{
  "message": "Station deleted successfully"
}
```

---

## 📅 Booking Endpoints

### Get Available Slots
```
GET /bookings/slots/:stationId/:date

Example:
GET /bookings/slots/63f5c1a2b8d9e4f5g6h7i8j9/2024-05-20

Response:
{
  "availableSlots": ["09:00", "10:00", "11:00", ...],
  "bookedSlots": ["14:00", "15:00", "16:00"]
}
```

### Get User's Bookings
```
GET /bookings/user/my-bookings
Authorization: Bearer <token>

Response:
{
  "bookings": [
    {
      "_id": "63f5c1a2b8d9e4f5g6h7i8j9",
      "user": {...},
      "station": {...},
      "date": "2024-05-20T00:00:00Z",
      "startTime": "14:00",
      "endTime": "16:00",
      "duration": 2,
      "slots": ["14:00", "15:00"],
      "stationType": "ps5",
      "pricePerHour": 200,
      "totalPrice": 400,
      "foodTotal": 250,
      "grandTotal": 650,
      "status": "confirmed",
      "paymentStatus": "pending"
    }
  ]
}
```

### Get All Bookings (Admin Only)
```
GET /bookings/admin/all
Authorization: Bearer <admin_token>

Response:
{
  "bookings": [...]
}
```

### Get Single Booking
```
GET /bookings/:id
Authorization: Bearer <token>

Response:
{
  "booking": {...}
}
```

### Create Booking
```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "stationId": "63f5c1a2b8d9e4f5g6h7i8j9",
  "date": "2024-05-20",
  "slots": ["14:00", "15:00", "16:00"],
  "stationType": "ps5",
  "pricePerHour": 200,
  "foodItems": [
    {
      "foodId": "63f5c1a2b8d9e4f5g6h7i8j9",
      "quantity": 2,
      "price": 100
    }
  ],
  "foodTotal": 200
}

Response:
{
  "message": "Booking created successfully",
  "booking": {...}
}
```

### Update Booking Status
```
PUT /bookings/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "confirmed",
  "paymentStatus": "completed"
}

Response:
{
  "message": "Booking updated successfully",
  "booking": {...}
}
```

### Cancel Booking
```
POST /bookings/:id/cancel
Authorization: Bearer <token>

Response:
{
  "message": "Booking cancelled successfully",
  "booking": {...}
}
```

### Delete Booking (Admin Only)
```
DELETE /bookings/:id
Authorization: Bearer <admin_token>

Response:
{
  "message": "Booking deleted successfully"
}
```

---

## 🍔 Food Menu Endpoints

### Get All Food Items
```
GET /food

Response:
{
  "foods": [
    {
      "_id": "63f5c1a2b8d9e4f5g6h7i8j9",
      "name": "Energy Drink",
      "price": 100,
      "category": "beverage",
      "description": "Red Bull or similar",
      "image": "https://...",
      "availability": true,
      "quantity": 50
    },
    ...
  ]
}
```

### Get Food by Category
```
GET /food/category/beverage
GET /food/category/snack
GET /food/category/meal
GET /food/category/dessert

Response:
{
  "foods": [...]
}
```

### Get Single Food Item
```
GET /food/:id

Response:
{
  "food": {...}
}
```

### Create Food Item (Admin Only)
```
POST /food
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "name": "Latte Coffee",
  "price": 120,
  "category": "beverage",
  "description": "Hot latte coffee",
  "image": "https://...",
  "quantity": 50
}

Response:
{
  "message": "Food item created successfully",
  "food": {...}
}
```

### Update Food Item (Admin Only)
```
PUT /food/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "price": 150,
  "quantity": 40,
  "availability": true
}

Response:
{
  "message": "Food item updated successfully",
  "food": {...}
}
```

### Delete Food Item (Admin Only)
```
DELETE /food/:id
Authorization: Bearer <admin_token>

Response:
{
  "message": "Food item deleted successfully"
}
```

---

## 🔑 Authentication Header

For all protected endpoints, include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Admin access required |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## ✅ Booking Status Values

- `pending` - Booking awaiting confirmation
- `confirmed` - Booking confirmed
- `active` - Booking in progress
- `completed` - Booking completed
- `cancelled` - Booking cancelled

---

## 💳 Payment Status Values

- `pending` - Payment not yet made
- `completed` - Payment completed
- `failed` - Payment failed

---

## 🎮 Station Type Values

- `ps5` - PlayStation 5 station
- `pc` - Gaming PC station

---

## 🍽️ Food Category Values

- `beverage` - Drinks
- `snack` - Light snacks
- `meal` - Full meals
- `dessert` - Desserts
