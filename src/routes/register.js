const express = require('express')
const routes = express.Router()
const User = require('../models/User')
const path = require('path')
const cookieParser = require('cookie-parser')

routes.use(cookieParser())
routes.use(express.urlencoded({ extended: false }))
routes.use(express.json())

routes.get('/register', async (req, res) => {
    const cookies = req.cookies
    const registerPath = path.join(__dirname, '..', 'views', 'register.html');
    if(cookies['auth-token']) {
        const findUser = await User.findOne({ where: { id: cookies['auth-token'] } })
        if(findUser) {
            res.redirect('/')
        } else {
            await res.clearCookie('auth-token')
            res.sendFile(registerPath)
        }
    } else {
        res.sendFile(registerPath)
    }
})

routes.post('/register', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.status(400)

    if(username == password) return res.status(400).json({ msg: 'O nome de usuário não pode ser a senha' })
    if(username.length < 5) return res.status(400).json({ msg: 'O nome de usuário não pode ter menos de 5 caracteres' })
    if(password.length < 5) return res.status(400).json({ msg: 'A senha não pode ter menos de 5 caracteres' })
    
    const isUserExists = await User.findOne({ where: { username }})
    if(isUserExists) return res.status(403).json({ msg: 'Usuário já existente'})

    const createUser = await User.create({ username, password })

    if(createUser) res.json(createUser)
    else res.status(500).json({ msg: 'Erro interno de servidor' })
})

module.exports = routes