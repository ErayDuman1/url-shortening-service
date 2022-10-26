const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')
const { connect } = require('mongoose')

app = express()
dotenv.config()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

dbConnection();

app.use('/shorten', require('./routes/url'))
app.use('/', require('./routes/redirect'))

PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})