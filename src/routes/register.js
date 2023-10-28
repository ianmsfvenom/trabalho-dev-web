const express = require('express')
const routes = express.Router()
const User = require('../models/User')

routes.use(express.urlencoded({ extended: false }))
routes.use(express.json())

routes.post('/register', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.status(400)

    if(username == password) return res.status(400).json({ msg: 'Username cannot be the same as password' })
    if(username.length < 5) return res.status(400).json({ msg: 'Username cannot be less than 5 characters long' })
    if(password.length < 5) return res.status(400).json({ msg: 'Password cannot be less than 5 characters long' })
    
    const isUserExists = await User.findOne({ where: { username }})
    if(isUserExists) return res.status(403).json({ msg: 'User already exists'})

    const createUser = await User.create({ username, password })

    if(createUser) res.json(createUser)
    else res.status(500).json({ msg: 'Internal server error' })
})

module.exports = routes