const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res) => {
  User.findOne({userName: req.body.username}, (err, foundUser) => {
    //Database error
    if (err) {
      console.log(err)
      res.send('The db has an error')
    //User not found
    } else if (!foundUser) {
      res.send('<a href="/">Sorry, no user found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      //Passwords don't match
      } else {
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})
//destroys the session and allows the user to log out
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
module.exports = sessions
