# E-commerce RESTful API (Node.js + MongoDB)
This is a simple e-commerce backend built with Node.js, Express, and MongoDB. It features JWT-based authentication and role-based access control.

## Overview
This project is a basic e-commerce backend built using **Node.js**, **Express**, and **MongoDB**. It supports:
- User Registration & Login with JWT
- Role-based access control (admin/customer)
- Product listing, creation, and deletion

## Features
- JWT Authentication
- Role-based Authorization
- Password Hashing with Bcrypt
- Product CRUD (admin only for POST/DELETE)

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Bcrypt

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
- `POST /auth/register`
- `POST /auth/login`

### Products
- `GET /products`
- `POST /products` (admin only)
- `DELETE /products/:id` (admin only)

