const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const passport = require('passport');

// Loading Post model
const Post = require('../../models/Post');

// Loading input validator
const validatePostInput = require('../../validations/post');

router.get('/test', (req,res) => res.json({msg:"Post Works"}));

// @route POST api/posts
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
})

module.exports = router;
