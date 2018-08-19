const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoURI;
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');


mongoose
  .connect(db)
  .then((err) => console.log('Mongo connected!'))
  .catch((err) => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
