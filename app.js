const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://mongo:27017/studentCentralDB'

const app = express()

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.get('/', (req, res) => {
    res.send('Hello Professor Adam Bondi!')
})

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.use(express.json())

const networkRouter = require('./routes/networks')
app.use('/networks', networkRouter)

app.listen(9000,  () => {
    console.log('Server started')
})