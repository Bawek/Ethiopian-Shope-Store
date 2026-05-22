const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            const folder = path.join(__dirname,'..','uploads','images')
            cb(null, folder);  // Uploading books
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique file name
    }
});

// File filtering
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'pdf' && file.mimetype === 'application/pdf') {
        cb(null, true); // Only accept PDFs for books
    } else if (file.fieldname === 'coverimg' && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
        cb(null, true); // Only accept JPG/PNG for images
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
});

module.exports = upload;
