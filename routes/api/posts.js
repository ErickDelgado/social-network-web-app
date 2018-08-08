const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const passport = require('passport');

// Loading Post model
const Post = require('../../models/Post');
router.get('/test', (req,res) => res.json({msg:"Post Works"}));

// @route POST api/posts
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt'), {session:false}, (req, res) => {
  const newPost = new Post({

  })
})

module.exports = router;
