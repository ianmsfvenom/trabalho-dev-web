const express = require('express')
const database = require('./src/config/database')
const routes = require('./src/routes/routes')
const app = express()
const PORT = process.env.PORT || 4444

async function main() {
    await database.sync()

    app.use('/', routes)

    app.listen(PORT, async () => {
        console.log('Servidor ligado, escutando a porta', PORT);
    })
}

main()