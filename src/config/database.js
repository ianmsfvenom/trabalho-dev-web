const Sequelize = require('sequelize')
const database = new Sequelize('database', null,  null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './src/database/database.sqlite',
    logging: false
})

module.exports = database