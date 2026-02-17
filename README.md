# User Authentication System

A 4-page authentication system built using:
- Node.js
- Express
- MySQL
- EJS

## Features

- ✅ Registration (Day 1)
- ⏳ Login (Coming Day 2)
- ⏳ Profile Page (Coming Day 3)
- ⏳ Forgot Password (Coming Day 4)

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
