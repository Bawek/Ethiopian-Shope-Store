const jwt = require("jsonwebtoken")
const prisma = require("../config/db")
const { generateAccessToken } = require("../utils/generateToken")
const httpError = require("../middlewares/httpError")

const handleRefreshToken = async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie) return res.sendStatus(403)
    const refreshToken = cookie.token
    try {
        const findUser = await prisma.account.findFirst(
            {
                where: {
                    refreshToken
                }
            }
        )
        if (!findUser) return res.sendStatus(400)
        const userInfo = {
            accountId: findUser.id,
            role: findUser.role
        }
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err || findUser.id !== decoded.userInfo.accountId) return res.sendStatus(403)
            const accessToken = await generateAccessToken(userInfo, next)
            res.status(200).json({ accessToken, role: findUser.role })
        })
    } catch (err) {
        console.log(err)
        next(new httpError(err.message, 500))
    }


}

module.exports = handleRefreshToken