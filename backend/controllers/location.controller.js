const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const locationRegistration = async (req, res, next) => {
    const {
        town,
        region,
        kebele,
        woreda,
    } = req.body
    if (town === ' ' && region === " "){
        console.log("empty comes")
        return next(new httpError("Sorry All Fields are Required.", 403))
    } 
    try {
        // Register the new account (additional validation as necessary)
        const newLocation = await prisma.location.create({
            data: {
                town,
                country: "ETHIOPIA",
                region,
                kebele,
                woreda
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            location: newLocation,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    locationRegistration
}
