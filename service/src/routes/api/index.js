const express = require('express')

const router = express.Router()

const initNotifications = require('./notifications')
const clickNotification = require('./clickNotification')

router.post('/init', initNotifications)
router.post('/click', clickNotification)

module.exports = router
