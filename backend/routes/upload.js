const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload file to Cloudinary
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
        });

        req.file.stream.pipe(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 