// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.roles.includes('admin')) {
        return next();
    }
    res.redirect('/');
}

module.exports = { isAuthenticated, isAdmin };
