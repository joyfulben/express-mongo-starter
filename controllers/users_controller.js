const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')
const Author = require('../models/author.js')

//show sign up form
users.get('/new', (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser})
})

// create new user
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Author.create({userName: req.body.username, authorName: req.body.author}, (err, createdAuthor) => {
    console.log('author is created', createdAuthor);
  });
  Author.find({}, req.body, (err, foundAuthor) => {
    console.log('found you...', foundAuthor)
    res.redirect('/')
  })
})
module.exports = users
