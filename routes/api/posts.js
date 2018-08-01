const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

router.get('/test', (req,res) => res.json({msg:"Post Works"}));

module.exports = router;
