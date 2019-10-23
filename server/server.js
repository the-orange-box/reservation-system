const express = require('express');
const app = express();
const path = require('path');
const db = require('./data/db.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/:id', express.static(path.join(__dirname, '../public')));

app.get('/id/:id', (req, res, next) => {
  let pID = req.params.id;
  db.Properties.findAll( {
    where: {
      pID
    }
  }).then(property => {
    res.send(property);
    next();
  });
});

app.get('/BookedDates/:bookedDates', (req, res, next) => {
  let bProperty_ID = req.params.bookedDates;
  db.Booked.findAll( {
    where: {
      bProperty_ID
    }
  }).then(property => {
    res.send(property);
    next();
  });
});

app.post('/BookedDates', (req, res, next) => {
  var promises = [];
  let bookedDates = req.body.bookedDates;
  for (let i = 0; i < bookedDates.length; i++) {
    promises.push(db.Booked.create({bProperty_ID: bookedDates[i].bProperty_ID, bUser_ID: bookedDates[i].bUser_ID, Date: bookedDates[i].Date}));
  }
  Promise.all(promises);
})


app.listen(3000);