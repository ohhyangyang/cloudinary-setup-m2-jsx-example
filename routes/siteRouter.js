const express = require("express");
const siteRouter = express.Router();
const User = require('./../models/User.model');

// Your routes
siteRouter.get('/profile', (req, res, next) => {
  const { _id } = req.session.currentUser;
  // const  _id = req.session.currentUser._id;

  User.findById( _id )
    .then((user) => {
      const props = { user };
      
      res.render('Profile', props );
    })
})

module.exports = siteRouter;
