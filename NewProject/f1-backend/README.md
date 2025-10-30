# F1 PITWALL Backend API

🏎️ Backend authentication server for F1 PITWALL React application.

## Features

- User Registration (Signup)
- User Authentication (Login)
- JWT Token-based Authentication
- Password Hashing with bcrypt
- CORS enabled for React frontend

## Tech Stack

- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcryptjs
- In-memory storage (can be replaced with MongoDB/PostgreSQL)

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Signup
- **POST** `/api/auth/signup`
- **Body**: `{ name, email, password }`
- **Response**: `{ message, user, token }`

### 2. Login
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ message, user, token }`

### 3. Get Current User
- **GET** `/api/auth/user`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user }`

### 4. Logout
- **POST** `/api/auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ message }`

## Environment Variables

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your-secret-key-here
```

## Notes

- Currently uses in-memory storage
- For production, integrate with MongoDB or PostgreSQL
- JWT tokens expire in 7 days

