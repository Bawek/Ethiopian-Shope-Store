const jwt = require("jsonwebtoken")
const httpError = require("./httpError")

const resetAuth = async (req, res, next) => {
    const { token } = req.params
    try {
        const decoded = await jwt.verify(token, 'reset')
        if (!decoded) return next(new httpError('Expired token', 401))
        req.userId = decoded.userId
        next()
    } catch (error) {
        return next(new httpError(error.message || 'Something went wrong', 500))
    }
}


module.exports = resetAuth