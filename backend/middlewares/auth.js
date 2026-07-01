const jwt = require('jsonwebtoken');
const httpError = require('./httpError');
const prisma = require('../config/db');

const auth = async (req, res, next) => {
    // 1. Extract and validate authorization header
    const authHeader = req.headers.authorization?.trim();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new httpError('Authorization header missing or malformed', 401));
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1].trim();
    if (!token) {
        return next(new httpError('No token provided', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const account = await prisma.account.findUnique({
            where: { id: decoded.userInfo.id },
            select: {
                id: true,
                email: true,
                role: true,
                refreshToken: true
            }
        });

        if (!account) {
            return next(new httpError('Account not found', 401));
        }

        // 7. Attach user to request
        req.user = {
            id: account.id,
            email: account.email,
            role: account.role,
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new httpError('Token has expired', 401));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new httpError('Invalid token', 401));
        }
        console.error('Authentication error:', error);
        next(new httpError('Authentication failed', 500));
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new httpError('Unauthorized access', 403));
        }
        next();
    };
};

module.exports = {
    auth,
    authorize
};
