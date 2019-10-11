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

var populateBookedDates = function(startDate, endDate, bProperty_ID, bUser_ID) {
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
  var pBulkDiscount = shouldBeDisplayed(0.95);
  

  var pRequired_Week_Booking_Days = getRandomInt(3,8); 
  // console.log('pMax_guests: ' + pMax_guests + ' pNightly_price: ' + pNightly_price + 
  //               ' pCleaning_fee: ' + pCleaning_fee + ' pService_fee: ' + pService_fee + ' pTaxes_fees: ' + pTaxes_fees + 
  //               ' pBulkDiscount: ' + pBulkDiscount + ' pRequired_Week_Booking_Days: ' + pRequired_Week_Booking_Days);

  var pRequired_Weekend_Booking_Days = getRandomInt(3,8); 
  // console.log('pMax_guests: ' + pMax_guests + ' pNightly_price: ' + pNightly_price + 
  //               ' pCleaning_fee: ' + pCleaning_fee + ' pService_fee: ' + pService_fee + ' pTaxes_fees: ' + pTaxes_fees + 
  //               ' pBulkDiscount: ' + pBulkDiscount + ' pRequired_Weekend_Booking_Days: ' + pRequired_Weekend_Booking_Days);

  //INSERT QUERY FOR properties DB HERE
  db.Properties.create({ pMax_guests: pMax_guests,
                         pNightly_price: pNightly_price,
                         pCleaning_fee: pCleaning_fee,
                         pService_fee: pService_fee,
                         pTaxes_fees: pTaxes_fees,
                         pBulkDiscount: pBulkDiscount,
                         pRequired_Week_Booking_Days: pRequired_Week_Booking_Days,
                         pRequired_Weekend_Booking_Days: pRequired_Weekend_Booking_Days})
                .then(()=>{
                  var bProperty_ID = i 
                  var bUser_ID = 1; //just going to be 1 user table for stretch goal.
                
                  var startOfMonth = moment().format();
                  var endOfMonth   = moment().endOf('month').format();
                  populateBookedDates(startOfMonth, endOfMonth, bProperty_ID, bUser_ID);
                
                  var startOfSecondMonth = moment().startOf('month').add(1, 'months').format();
                  var endOfSecondMonth   = moment().endOf('month').add(1, 'months').format();
                  populateBookedDates(startOfSecondMonth, endOfSecondMonth, bProperty_ID, bUser_ID);
                
                  var startOfThirdMonth = moment().startOf('month').add(2, 'months').format();
                  var endOfThirdMonth   = moment().endOf('month').add(2, 'months').format();
                  populateBookedDates(startOfThirdMonth, endOfThirdMonth, bProperty_ID, bUser_ID);
                
                  var startOfFourthMonth = moment().startOf('month').add(3, 'months').format();
                  var endOfFourthMonth   = moment().endOf('month').add(3, 'months').format();
                  populateBookedDates(startOfFourthMonth, endOfFourthMonth, bProperty_ID, bUser_ID);
                }).catch(err => console.log(err));
}