const express = require('express');
const app = express();
const path = require('path');
const db = require('./data/db.js');

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/'));

app.use('/homepage/*/id', express.static(path.join(__dirname, '../public')));

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

app.post('/BookedDates', (req, res, next) => {
  console.log(req.body);
  var promises = [];
  let bookedDates = req.body.bookedDates;
  for (let i = 0; i < bookedDates.length; i++) {
    promises.push(db.Booked.create({bProperty_ID: bookedDates[i].bProperty_ID, bUser_ID: bookedDates[i].bUser_ID, Date: bookedDates[i].Date}));
  }
  Promise.all(promises);
})


app.listen(3000);