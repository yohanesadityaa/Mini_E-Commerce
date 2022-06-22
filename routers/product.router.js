const express = require('express')
const router = express.Router()

const {verify,verifyAdmin} = require('../middlewares/authentication')
const { create} = require('../controllers/product.controller')
const {getProduct} = require('../controllers/product.controller')

router.post('/create', verifyAdmin, create)
router.get('/getProduct', verify,getProduct)

module.exports = router;