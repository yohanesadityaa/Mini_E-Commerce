const express = require('express')
const router = express.Router()
const {verify} = require('../middlewares/authentication')
const {purchase} = require('../controllers/history.controller')
const {getUserHistory} = require('../controllers/history.controller')

router.post('/purchase', verify,purchase)
router.get('/getUserHistory',verify,getUserHistory)

module.exports = router;