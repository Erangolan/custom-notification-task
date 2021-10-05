require('./src/db')
const express = require('express')
const { initSocket } = require('./src/routes/middleware/initSocket')

const port = process.env.PORT || 4001
const api = require('./src/routes/api/index')

const app = express()
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/', api)

const socketIO = initSocket(app, port)
app.set('socketIO', socketIO)
