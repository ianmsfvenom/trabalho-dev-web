const express = require('express')
const routes = express.Router()
const User = require('../models/User')
const { Op } = require('sequelize')

routes.use(express.urlencoded({ extended: false }))
routes.use(express.json())

routes.post('/login', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.status(400)
    const findUser = await User.findOne({ where: {
        [Op.and]: [{ username }, { password }]
    }})

    if(!findUser) return res.status(401).json({ msg: 'User not found'})
    
    res.cookie('auth-token', findUser.id, { maxAge: 600000 })
    res.json(findUser)
})

module.exports = routes