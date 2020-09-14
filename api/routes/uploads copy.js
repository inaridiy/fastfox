const { Router } = require('express')
const multer = require('multer')
const path = require("path");
const sharp = require('sharp');

const router = Router()

const destDir = './api/posts/img/';

var storage = multer.diskStorage({
    destination: destDir,
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});
router.get('/uploads/:name', function (req, res) {

    res.sendFile(path.join(__dirname, "../posts/img/", req.params.name))
})

router.post('/uploads', upload.single('photo'), (req, res) => {
    res.json({ url: `/api/uploads/${req.file.originalname}` })
    if (req.file) {
        sharp(req.file.originalname)
            .resize(64)
            .toFile(destDir + 'resized' + req.file.originalname, (err, info) => {
                if (err) {
                    throw err;
                }

            });

    } else throw 'error';
});

module.exports = router
