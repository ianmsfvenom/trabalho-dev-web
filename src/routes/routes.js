const express = require('express')
const routes = express.Router()

routes.use('/', require('./login'))
routes.use('/', require('./register'))

module.exports = routes