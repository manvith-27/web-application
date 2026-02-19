# User Authentication System

A 4-page authentication system built using:
- Node.js
- Express
- MySQL
- EJS

## Features

- ✅ Registration (Day 1)
- ✅ Login (Day 2)
- ✅ Profile Page (Day 3)
- ✅ Forgot Password (Day 4)

## Setup

1. Run `setup.sql` in MySQL to create the database
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

Server runs on: http://localhost:3000

## Project Structure

```
├── app.js              # Main application file
├── config/
│   └── db.js          # MySQL connection
├── routes/
│   └── auth.js        # Authentication routes
├── views/
│   └── register.ejs   # Registration page
└── setup.sql          # Database schema
```

## Day 1 Progress

- Set up Express server with EJS templating
- Connected to MySQL database
- Implemented user registration with bcrypt password hashing
- Created users table with proper schema
- Built registration form with validation

## Day 2 Progress

- Created login page with email and password fields
- Implemented POST /login route with proper validation
- Integrated express-session for session management
- Created session storage for user data (id, name, email)
- Added logout functionality
- Implemented basic profile page (temporary)
- Added authentication middleware for protected routes
- Proper error handling for "User not found" and "Invalid credentials"

## Day 3 Progress

- Created professional profile page (profile.ejs) with:
  - User avatar with first letter of name
  - Welcome message and user information display
  - Beautiful gradient design
  - Member since date
  - Logout button
- Implemented isAuthenticated middleware for route protection
- Created dedicated profile routes (routes/profile.js)
- GET /profile - Protected route that fetches user data from database
- GET /logout - Destroys session and redirects to login
- Added redirectIfAuth middleware to prevent logged-in users from accessing login/register
- All database queries use prepared statements
- Proper error handling and session validation

## Day 4 Progress

- Created forgot password page (forgot.ejs) with:
  - Email input field
  - Professional gradient design matching login/register
  - Success and error message display
  - Link back to login page
- Created reset password page (reset.ejs) with:
  - New password and confirm password fields
  - Password validation (minimum 6 characters)
  - Error message display for mismatched passwords
- Implemented forgot password routes:
  - GET /forgot - Renders forgot password page
  - POST /forgot - Validates email exists and redirects to reset page
  - GET /reset/:id - Renders reset password page for specific user
  - POST /reset/:id - Updates password with bcrypt hashing
- Added "Forgot Password?" link to login page
- All routes use prepared statements for security
- Proper error handling throughout the flow
- Password reset validates match and minimum length before updating
