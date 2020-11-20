const express = require("express");
const authRouter = express.Router();
const User = require('./../models/User.model');

const parser = require('./../config/cloudinary');

// Your routes
authRouter.get('/signup', (req, res, next) => {
  res.render('Signup')
})

authRouter.post('/signup', parser.single('profilepic'), (req, res, next) => {
  
  const { email, password } = req.body;
  console.log(req.file);
  const imageUrl = req.file.secure_url;

  const newUser = { email, password, image: imageUrl };

  // Here we usually have our authentication/signup logic... 
  // ...checking email/password, hashing password, etc.

  User.create(newUser)
    .then((createdUser) => {
      createdUser.password = '***';
      req.session.currentUser = createdUser;
      
      res.redirect('/profile');
    })
    .catch((err) => console.log(err));
})

module.exports = authRouter;
