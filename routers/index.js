const express = require('express')
const router = express.Router()
const user = require('./user.router')
const product = require('./product.router')
const balance = require ('./balance.router')
const history = require ('./history.router')
router.use('/user', user)
router.use('/product', product)
router.use('/balance', balance)
router.use('/history',history)
module.exports = router;