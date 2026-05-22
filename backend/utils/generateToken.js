const jwt = require('jsonwebtoken')
const httpError = require('../middlewares/httpError')
const generateAccessToken = async (userInfo,next) => {
    try {
        return await jwt.sign(
            { userInfo },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}
const generateRefreshToken = async (userInfo,next) => {
    try {
        return await jwt.sign(
            { userInfo },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}