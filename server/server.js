const express = require('express');
const app = express();
const path = require('path');
const db = require('./data/db.js');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/id:*', (req, res, next) => {
  let pID = req.path.split(':')[1];
  db.Properties.findAll( {
    where: {
      pID
    }
  }).then(property => {
    res.send(property);
    next();
  });
});

app.get('/BookedDates:*', (req, res, next) => {
  let bProperty_ID = req.path.split(':')[1];
  db.Booked.findAll( {
    where: {
      bProperty_ID
    }
  }).then(property => {
    res.send(property);
    next();
  });
});


app.listen(3000);