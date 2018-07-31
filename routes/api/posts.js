const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

router.get('/test', (req,res) => res.json({msg:"Post Works"}));

router.post('/register', (req,res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: 'Email already in use.'})
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
      }
    })
});

module.exports = router;
