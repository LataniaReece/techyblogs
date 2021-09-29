const express = require('express');
const multer = require('multer');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'myblog2021',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

const upload = multer({storage});

router.post('/', upload.single('image'), async (req, res) => {
    const formattedImage = {url: req.file.path, filename: req.file.filename}
    res.send(formattedImage)
})

module.exports = router;