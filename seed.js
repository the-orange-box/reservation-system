const faker = require('faker');
const moment = require('moment');
moment().format();

const Promise = require('bluebird');
const Sequelize = require('sequelize');
const db = require('./server/data/db.js');

//min to [max]
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max-min));
}

var shouldBeDisplayed = function(value) {
  if(getRandomInt(0,2)) {
    return value; //random between 3-9   RANDOM WHETHER IT WILL SHOW UP OR NOT NULL
  } else {
    return null;
  }
}

var populateBookedDates = function(bProperty_ID, bUser_ID) {
  var startDate = moment().format();
  var endDate   = moment().endOf('month').format();
  for (let i = 0; i < 4; i++) {
    var generatedDates = new Set();
    var bookedDatesPerMonth = getRandomInt(3, 11);
    var promises = [];
    for (let j = 0; j < bookedDatesPerMonth; j++) {
      var date = moment(faker.date.between(startDate, endDate)).format('YYYY-MM-DD');
      if(generatedDates.has(date)) {
        while(generatedDates.has(date)) {
          date = moment(faker.date.between(startDate, endDate)).format('YYYY-MM-DD');
        }
      }
      generatedDates.add(date);
      // console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + date);
      promises.push(db.Booked.create({bProperty_ID: bProperty_ID, bUser_ID: bUser_ID, Date: date}));
    }
    startDate = moment().startOf('month').add(i + 1, 'months').format();
    endDate   = moment().endOf('month').add(i + 1, 'months').format();
  }
  Promise.all(promises);
}


//users
var username = faker.name.findName();
db.Users.create({ username: username }).catch(err => console.log(err));

//booked
for (let i = 1; i <= 100; i++) {

  var pMax_guests = getRandomInt(4,13);
  var pNightly_price = getRandomInt(89, 326);
  var pCleaning_fee = getRandomInt(35,81); 
  var pService_fee = 0.13;  //13% pNightly_price + pCleaning_Fee
  
  var pTaxes_fees = shouldBeDisplayed(getRandomInt(3,10));
  var pBulkDiscount = shouldBeDisplayed(0.05);
  

  var pRequired_Week_Booking_Days = getRandomInt(3,8); 
  var pRating = Math.floor(Math.random() * (500 - 100) + 100) / 100;
  var pReviews = getRandomInt(5,2750);

  db.Properties.create({ pMax_guests: pMax_guests,
                         pNightly_price: pNightly_price,
                         pCleaning_fee: pCleaning_fee,
                         pService_fee: pService_fee,
                         pTaxes_fees: pTaxes_fees,
                         pBulkDiscount: pBulkDiscount,
                         pRequired_Week_Booking_Days: pRequired_Week_Booking_Days,
                         pRating: pRating,
                         pReviews: pReviews})
                .then(()=>{
                  var bProperty_ID = i 
                  var bUser_ID = 1; //just going to be 1 user table for stretch goal.
                  populateBookedDates(bProperty_ID, bUser_ID);
                }).catch(err => console.log(err));
}