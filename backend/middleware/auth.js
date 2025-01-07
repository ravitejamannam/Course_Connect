const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { userModel } = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        // Fetch user from the database
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware
    } else {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = {
    authMiddleware,
    isAdmin
}; 