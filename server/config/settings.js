const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/rentingsystem',
    port: 1337
  },
  production: {
    port: process.env.PORT
  }
}
