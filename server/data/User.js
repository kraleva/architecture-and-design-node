const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = `{PATH} is required`
const type = mongoose.Schema.Types.String

let userSchema = new mongoose.Schema({
  username: { type: type, required: REQUIRED_VALIDATION_MESSAGE },
  firstname: { type: type, required: REQUIRED_VALIDATION_MESSAGE },
  lastname: { type: type, required: REQUIRED_VALIDATION_MESSAGE },
  salt: type,
  hashedPass: type,
  roles: [type]
})

userSchema.method({
  authenticate: function (password) {
    return (encryption.generateHashedPassword(this.salt, password) === this.hashedPass)
  }
})

let User = mongoose.model('User', userSchema)
module.exports = User
module.exports.seedAdminUser = () => {
  User.find({ roles: 'Admin' }).then(users => {
    if (users.length > 0) { return }
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')
    User.create({
      username: 'Admin',
      firstname: 'Admin',
      lastname: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
