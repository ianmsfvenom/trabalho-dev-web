const express = require('express')
const routes = express.Router()
const path = require('path')
const validateCookies = require('../middlewares/validateCookies')

routes.get('/social', validateCookies, async (req, res) => {
    const aboutUsPath = path.join(__dirname, '..', 'views', 'social.html')
    res.sendFile(aboutUsPath)
})

module.exports = routes