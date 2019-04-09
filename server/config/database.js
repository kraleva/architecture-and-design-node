const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db, { useNewUrlParser: true })
  let db = mongoose.connection
  db.once('open', err => {
    if (err) {
      throw err
    }
    console.log('MongoDB connected')
  })
  db.on('err', err => {
    console.log(`Database error + ${err}`)
  })
}
