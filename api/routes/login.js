const { Router } = require('express')

const router = Router()

// Test route
router.post('/auth/login/', (req, res) => {
    console.log(req.body)
})
module.exports = router
