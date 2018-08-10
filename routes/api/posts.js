const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const passport = require('passport');

// Loading Post model
const Post = require('../../models/Post');
// Loading Profile model
const Profile = require('../../models/Profile');


// Loading input validator
const validatePostInput = require('../../validations/post');

router.get('/test', (req,res) => res.json({msg:"Post Works"}));

// @route POST api/posts
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
});

// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}))
});


// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}))
});

// @route Delete api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.user.toString() !== req.user.id) {
            res.status(401).json({notauthorized: 'User not authorized'})
          } else {
            post.remove().then(() => res.json({success: true}))
          }
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

// @route posts api/posts/like/:id
// @desc Like Post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({alreadyliked: 'User already liked this post'})
          } else {
            // Add user id to likes array
            post.likes.unshift({user:req.user.id});
            post.save().then(post => res.json(post))
          }
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

// @route posts api/posts/unlike/:id
// @desc Unlike Post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({alreadyliked: 'You have not yet liked this post'})
          } else {
            // Get remove Index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

module.exports = router;
