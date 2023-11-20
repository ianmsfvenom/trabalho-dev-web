const User = require("../models/User")

const validateCookies = async (req, res, next) => {
    const cookies = req.cookies
    if(cookies['auth-token']) {
        const findUser = await User.findOne({ where: { id: cookies['auth-token'] } })
        if(findUser) {
            next()
        } else {
            await res.clearCookie('auth-token')
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

module.exports = validateCookies