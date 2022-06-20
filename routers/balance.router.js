const express = require('express')
const router = express.Router()
const verify = require('../middlewares/authentication')
const { Topup} = require('../controllers/balance.controller')

router.post('/topup', verify,Topup)

module.exports = router;