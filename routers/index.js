const express = require('express')
const router = express.Router()
const user = require('./user.router')
const product = require('./product.router')
const balance = require ('./balance.router')

router.use('/user', user)
router.use('/product', product)
router.use('/balance', balance)
module.exports = router;