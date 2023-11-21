const express = require('express')
const routes = express.Router()
const path = require('path')
const validateCookies = require('../middlewares/validateCookies')

routes.get('/about-us', validateCookies, async (req, res) => {
    const aboutUsPath = path.join(__dirname, '..', 'views', 'about-us.html')
    res.sendFile(aboutUsPath)
})

module.exports = routes