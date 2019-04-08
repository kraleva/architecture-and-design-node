const express = require('express')
const mongoose = require('mongoose')

let env = process.env.NODE_ENV || 'development'
let port = process.env.PORT || 1337

let app = express()

mongoose.Promise = global.Promise

app.get('/', (req, res) => {
  mongoose
    .connect('mongodb://localhost:27017/generictemplate')
    .then(() => {
      console.log('MongoDb Ready!')
    })
  res.send('Hi!')
})

app.listen(port)
console.log(`Server listening on port ${port}`)
