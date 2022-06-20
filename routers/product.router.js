const express = require('express')
const router = express.Router()
const verify = require('../middlewares/authentication')
const { create, getProduct} = require('../controllers/product.controller')

router.post('/createProduct', verify, create)
router.post('/getProduct', getProduct)

module.exports = router;