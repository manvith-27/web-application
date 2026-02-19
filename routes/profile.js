const express = require('express');
const db = require('../config/db');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Profile page - protected route
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    
    // Fetch user data from database using prepared statement
    const [users] = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      // User not found in database, destroy session
      req.session.destroy();
      return res.redirect('/login');
    }

    const user = users[0];
    
    // Render profile page with user data
    res.render('profile', { user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).send('Error loading profile');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

module.exports = router;
