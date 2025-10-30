# F1 PITWALL - Authentication System Setup Guide

## ✅ What's Been Implemented

### Backend (Node.js + Express)
- ✅ Full authentication API with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Signup, Login, Logout endpoints
- ✅ Token verification middleware
- ✅ CORS enabled for React frontend

### Frontend (React)
- ✅ AuthContext for global state management
- ✅ Login page with backend integration
- ✅ Signup page with backend integration
- ✅ Auto-redirect after signup (goes to homepage, user is logged in)
- ✅ User profile dropdown in header (replaces Login/Signup buttons when logged in)
- ✅ Logout functionality
- ✅ Protected routes ready (can be implemented if needed)

## 🚀 How to Run

### 1. Start Backend Server

```bash
cd "d:\F1Demo (2)\NewProject\f1-backend"
npm start
```

Backend will run on: `http://localhost:5000`

### 2. Start React Frontend

```bash
cd "d:\F1Demo (2)\NewProject\f1-pitwall-react"
npm start
```

Frontend will run on: `http://localhost:3000`

## 📝 How It Works

### Sign Up Flow:
1. User clicks "Sign Up" button
2. Fills in name, email, password
3. Backend creates account with hashed password
4. Backend returns JWT token
5. React saves token and user info
6. **User is automatically logged in**
7. Redirects to homepage
8. Header shows user profile instead of Login/Signup buttons

### Login Flow:
1. User clicks "Login" button
2. Enters email and password
3. Backend verifies credentials
4. Backend returns JWT token
5. React saves token and user info
6. Redirects to homepage
7. Header shows user profile

### User Profile:
- Shows user's first letter in avatar circle
- Displays user's name
- Click to open dropdown with:
  - Full name
  - Email
  - Logout button

### Logout:
- Click logout in dropdown
- Clears token and user data
- Redirects to homepage
- Header shows Login/Signup buttons again

## 🔐 Features

- ✅ Secure password hashing
- ✅ JWT token authentication
- ✅ Token stored in localStorage
- ✅ Auto-login after signup
- ✅ Persistent sessions (stays logged in on page refresh)
- ✅ Beautiful F1-themed UI
- ✅ Smooth animations
- ✅ Error handling

## 📱 UI Changes

**When NOT logged in:**
- Header shows: `[Login] [Sign Up]`

**When logged in:**
- Header shows: `[👤 User Name ▼]`
- Click to see dropdown with logout option

## 🎯 Next Steps (Optional Enhancements)

1. **Protected Routes**: Restrict certain pages to logged-in users only
2. **Profile Page**: Add a dedicated user profile page
3. **Password Reset**: Add forgot password functionality
4. **Database**: Replace in-memory storage with MongoDB/PostgreSQL
5. **Social Login**: Add Google/Facebook login
6. **Email Verification**: Send verification emails on signup

## 💾 Data Storage

**Current:** In-memory (backend) + localStorage (frontend)
**Note:** Backend data is lost when server restarts. For production, use a real database.

## 🏁 Ready to Use!

Your F1 PITWALL now has a complete authentication system! Just make sure both servers are running and test it out! 🏎️✨

