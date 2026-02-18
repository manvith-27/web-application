// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Middleware to redirect if already logged in
const redirectIfAuth = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/profile');
  }
  next();
};

module.exports = { requireAuth, redirectIfAuth };
