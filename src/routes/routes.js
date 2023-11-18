const express = require('express')
const routes = express.Router()

routes.use('/', require('./login'))
routes.use('/', require('./register'))

routes.get('/', async (req, res) => {
    res.redirect('/login')
})

module.exports = routes