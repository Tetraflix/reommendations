const express = require('express');
const seedData = require('../database/dummydata/seedData.js');
const movieData = require('../database/dummydata/movieData.js');
require('../database/movies/index.js');
require('../database/ratios/index.js');

const app = express();
const port = 3000;

app.post('/dummydata', (req, res) => {
  seedData()
    .then(() => {
      res.sendStatus(201);
    });
});

app.post('/moviedata', (req, res) => {
  movieData();
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`App is listening on Port ${port}!`);
});
