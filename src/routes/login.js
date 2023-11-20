const express = require('express')
const routes = express.Router()
const User = require('../models/User')
const { Op } = require('sequelize')
const path = require('path')
const cookieParser = require('cookie-parser')

routes.use(express.urlencoded({ extended: false }))
routes.use(express.json())
routes.use(cookieParser())

routes.use(express.static(path.join(__dirname, '..', 'public')))

routes.get('/login', async (req, res) => {
    const cookies = req.cookies
    const loginPath = path.join(__dirname, '..', 'views', 'login.html');
    if(cookies['auth-token']) {
        const checkUser = await User.findOne({ where: { id: cookies['auth-token'] } })
        if(checkUser) {
            res.redirect('/')
        } else {
            await res.clearCookie('auth-token')
            res.sendFile(loginPath)
        }
    } else {
        res.sendFile(loginPath)
    }
})

routes.post('/login', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.status(400).json({ msg: 'Dados faltando!' })
    const findUser = await User.findOne({ where: {
        [Op.and]: [{ username }, { password }]
    }})

    if(!findUser) return res.status(401).json({ msg: 'Usuário ou senha inválidos!' })
    
    res.cookie('auth-token', findUser.id, { maxAge: 3600000 })
    res.json(findUser)
})

module.exports = routes