const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')

//show sign up form
users.get('/new', (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser})
})

// create new user
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
   User.create(req.body, (err, createdUser) => {
   res.redirect('/plants')
  });
})
module.exports = users
