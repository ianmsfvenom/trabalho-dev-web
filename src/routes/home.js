const express = require('express')
const validateCookies = require('../middlewares/validateCookies')
const routes = express.Router()
const path = require('path')

routes.get('/home', validateCookies, async (req, res) => {
    const pathHome = path.join(__dirname, '..', 'views', 'home.html')
    res.sendFile(pathHome)
})


module.exports = routes