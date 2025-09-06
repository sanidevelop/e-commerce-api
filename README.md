# E-commerce RESTful API (Node.js + MongoDB)

This is a simple e-commerce backend built with Node.js, Express, and MongoDB.  
It features JWT-based authentication, role-based access control, product management, brand management, order management, and paginated product listing by brand.

---

## Overview
This project is a basic e-commerce backend built using **Node.js**, **Express**, and **MongoDB**. It supports:
- User Registration & Login with JWT
- Role-based access control (Admin/Customer)
- Product listing, creation, and deletion
- Brand listing, creation, update and deletion
- Orders (Customer can create, Admin can manage)
- Paginated products by brand

---

## 🔗 Live API
Deployed on Render:  
**https://e-commerce-api-heyc.onrender.com**

---

## ✨ Features
- JWT Authentication
- User Registration & Login (JWT-based)
- Role-based Authorization (Admin & Customer)
- Create, List, and Delete Products (Admin only for create/delete)
- Create, Update, Delete, and Get Brands (Admin only for create/update/delete)
- Paginated Product Listing by Brand
- Create Orders (Customers only)
- Manage Orders (Admins only → view/update status)
- MongoDB Atlas Integration
- Mongoose ODM
- Secure Password Hashing with Bcrypt
- Postman Collection / VSCode REST Client (`test.http`) for Testing

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Bcrypt
- mongoose-paginate-v2
- Render (Deployment)

---

## 🔐 Authentication
Authentication is handled using **JSON Web Tokens (JWT)**.  
You must log in and include your token in the request headers for all protected endpoints.

**Header format:**
```http
Authorization: Bearer <your_token>

## Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
```

### 3. Start Server
```bash
node server.js
```

## API Endpoints

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get token

### Products
- `GET /products` – Retrieve all products (public)
- `POST /products` – Create product (Admin-only; includes brand ID)
- `GET /brands/:brandId/products?page=1&limit=10` – Paginated list of products by brand
- `DELETE /products/:id` – Delete product by ID (Admin only)

### Brand
- `POST /brands` – Create a new brand (Admin only)
- `GET /brands` – List all brands
- `PUT /brands/:id` – Update brand by ID (Admin only)
- `DELETE /brands/:id` – Delete brand by ID (Admin only)

### Orders
- `POST /orders` - Create a new order (Customer-only)
- `GET /orders` - View all orders (Admin-only)
- `GET /orders/:id` - View a single order by ID (Admin-only)
- `PUT /orders/:id` → Update order status (Admin-only)

### 🧪 Testing

- You can test the API using:

- Postman Collection (import endpoints manually)

- VSCode REST Client with the provided test.http file