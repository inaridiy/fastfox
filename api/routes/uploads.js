const { Router } = require('express')
const multer = require('multer')
const path = require("path");

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/posts/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })
router.get('/uploads/:name', function (req, res) {

    res.sendFile(path.join(__dirname, "../posts/img/", req.params.name))
})

router.post('/uploads', upload.single('file'), function (req, res) {
    res.json({ url: `/api/uploads/${req.file.originalname}` })
})

module.exports = router
