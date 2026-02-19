const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { redirectIfAuth } = require('../middleware/auth');

const router = express.Router();

// Registration routes
router.get('/register', redirectIfAuth, (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      return res.render('register', { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { error: 'Registration failed. Please try again.' });
  }
});

// Login routes
router.get('/login', redirectIfAuth, (req, res) => {
  res.render('login', { error: null, success: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.render('login', { error: 'User not found', success: null });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render('login', { error: 'Invalid credentials', success: null });
    }

    // Create session
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    res.redirect('/profile');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'Login failed. Please try again.', success: null });
  }
});

// Forgot Password routes
router.get('/forgot', (req, res) => {
  res.render('forgot', { error: null, success: null });
});

router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.render('forgot', { error: 'Email not found', success: null });
    }

    const userId = users[0].id;
    res.redirect(`/reset/${userId}`);
  } catch (error) {
    console.error('Forgot password error:', error);
    res.render('forgot', { error: 'Something went wrong. Please try again.', success: null });
  }
});

// Reset Password routes
router.get('/reset/:id', (req, res) => {
  const userId = req.params.id;
  res.render('reset', { error: null, userId });
});

router.post('/reset/:id', async (req, res) => {
  const userId = req.params.id;
  const { password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.render('reset', { error: 'Passwords do not match', userId });
    }

    if (password.length < 6) {
      return res.render('reset', { error: 'Password must be at least 6 characters', userId });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    res.redirect('/login');
  } catch (error) {
    console.error('Reset password error:', error);
    res.render('reset', { error: 'Failed to reset password. Please try again.', userId });
  }
});

module.exports = router;
