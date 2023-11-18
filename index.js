const express = require('express')
const database = require('./src/config/database')
const routes = require('./src/routes/routes')
const app = express()
const PORT = process.env.PORT || 4444
const path = require('path')

async function main() {
    await database.sync()

    app.use(express.static(path.join(__dirname+'/src/public')))

    app.use('/', routes)

    app.listen(PORT, async () => {
        console.log(`Servidor rodando ( http://localhost:${PORT} ) escutando a porta ${PORT}...`);
    })
}

main()