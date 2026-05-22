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
                status: true,
                refreshToken: true 
            }
        });

        if (!account) {
            return next(new httpError('Account not found', 401));
        }

        // 5. Check if account is active
        if (account.status !== 'ACTIVE') {
            return next(new httpError('Account is not active', 403));
        }

        if (decoded.tokenVersion !== account.tokenVersion) {
            return next(new httpError('Token has been invalidated', 401));
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
    } finally {
        await prisma.$disconnect();
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



// const jwt = require("jsonwebtoken")
// const httpError = require("./httpError")

// const auth = async (req, res, next) => {
//     // extract the header
//     const authHeader = req.headers.authorization || req.headers.Authorization
//     if (!authHeader) return next(new httpError('header is not set', 403))
//     // extract the token
//     const token = authHeader.split(' ')[1]
//     if (!token) return next(new httpError('There is error on extracting the token', 403))
//     try {
//         await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) return next(new httpError('The token is expired', 401))
//             // add the account to the requist body
//             req.user = decoded.userInfo
//             next()
//         })


//     } catch (error) {
//         console.log('error on the auth', error)
//         next(new httpError(error.message, 500))
//     }
// }


// module.exports = {
//     auth
// }