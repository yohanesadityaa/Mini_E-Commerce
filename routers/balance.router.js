const express = require('express')
const router = express.Router()
const {verifyAdmin} = require('../middlewares/authentication')
const {Topup} = require('../controllers/balance.controller')

router.post('/topup', verifyAdmin,Topup)

module.exports = router;