const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = config.get('port') || 7777

app.use(cors)
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/link', require('./routes/link.routes.js'))
app.use('/t', require('./routes/redirect.routes.js'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (res, req) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT,() => console.log(`App has been started on ${PORT} port`))
    }catch (e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()
