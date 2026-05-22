const prisma = require("../config/db")

const uploadImage = async (req, res, next) => {
    if (!req.files) return res.status(400).json({ message: 'File is required', success: false })
    try {
        const imageUrl = `http://localhost:8000/images/${req.files.files[0].filename}`; // Construct URL for frontend

        // Save  image URL to database (Optional)
        // await prisma.picture.create({
        //     data: { image: imageUrl }, // Save file path to database
        // });

        res.status(200).json({
            data: [
                { url: imageUrl }
            ]
        });;
    } catch (error) {
        console.log(error, 'image uploade')
    }
}

module.exports = {
    uploadImage
}