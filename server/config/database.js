const mongoose = require('mongoose')
const User = require('../data/User')
mongoose.Promise = global.Promise
require('../data/Car')

module.exports = (settings) => {
  mongoose.connect(settings.db, { useNewUrlParser: true })
  let db = mongoose.connection
  db.once('open', err => {
    if (err) {
      throw err
    }
    console.log('MongoDB connected')
    User.seedAdminUser()
  })
  db.on('err', err => {
    console.log(`Database error + ${err}`)
  })
}
