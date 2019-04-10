const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // add validations!
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
    User.create({
      username: reqUser.username,
      firstname: reqUser.firstname,
      lastname: reqUser.lastname,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }
        res.redirect('/')
      })
    })
  }
}
