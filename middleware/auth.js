// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
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

module.exports = { isAuthenticated, redirectIfAuth };
