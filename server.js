const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoURI;
mongoose
  .connect(db)
  .then((err) => console.log('Mongo connected!'))
  .catch((err) => console.log(err));
app.get('/', (req, res) => res.send('Hello'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
