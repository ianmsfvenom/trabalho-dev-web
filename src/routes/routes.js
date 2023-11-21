const express = require('express')
const routes = express.Router()
const cookieParser = require('cookie-parser')
const validateCookies = require('../middlewares/validateCookies')

routes.use(cookieParser())

routes.use('/', require('./login'))
routes.use('/', require('./register'))
routes.use('/', require('./home'))
routes.use('/', require('./about-us'))
routes.use('/', require('./social'))

routes.get('/', validateCookies, async (req, res) => {
    res.redirect('/home')
})

module.exports = routes