'use strict'

require('dotenv').config();

const express = require('express')
const cfenv = require('cfenv')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
let appEnv = cfenv.getAppEnv()

//Import route files
const serverRoutes = require('./routes/serverRoutes')

//Data parsers for the request body
app.use(express.json())

app.use(morgan('dev'))

//Allowing CORS to FRONTEND reqs in another domain
app.use(cors())

//Define the route files here
app.use('/', serverRoutes)

//DB connection

//Error handling
app.use((error, req, res, next) => {
    return res.status(500).send({ error })
})

//Starts the application server 
var port = process.env.PORT || 6005
app.listen(appEnv.port, function () {
    console.log('Server running at: http://localhost:' + appEnv.port);
})

module.exports = app