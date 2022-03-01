const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api', require('./routes/user.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/news', require('./routes/news.routes'))
app.use('/api/teacher', require('./routes/teacher.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true
        }) // подключение к бд
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }

}

start()