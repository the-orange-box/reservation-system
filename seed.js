var faker = require('faker');
var moment = require('moment');
moment().format();

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

var populateBookedDates = function(startDate, endDate) {
  var generatedDates = new Set();
  var bookedDatesPerMonth = getRandomInt(3, 11);
  for (let j = 0; j < bookedDatesPerMonth; j++) {
    var date = moment(faker.date.between(startDate, endDate)).format('YYYY-MM-DD');
    if(generatedDates.has(date)) {
      while(generatedDates.has(date)) {
        date = faker.date.between(startDate, endDate);
      }
    }
    generatedDates.add(date);
    console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + date);
    //INSERT QUERY FOR booked DB HERE
  }
}


//users
var username = faker.name.findName();
console.log('username: ' + username); //REMOVE TODO EVENTUALLY
db.Users.create({ username: username }).then(user => {
  console.log("User's auto-generated ID:", user.userID);
}).catch(err => console.log(err));

//booked
for (let i = 1; i <= 100; i++) {

  var pMax_guests = getRandomInt(4,13); //fandom 4-12
  var pNightly_price = getRandomInt(89, 326);//average 160.47  89.00 - 325.00
  var pCleaning_fee = getRandomInt(35,81); //average $50      35 - 80
  var pService_fee = 0.13;  //13%     .13 of pNightly_price + pCleaning_Fee
  
  var pTaxes_fees = shouldBeDisplayed(getRandomInt(3,10));
  var pBulkDiscount = shouldBeDisplayed(0.95);
  

  var pRequired_Week_Booking_Days = getRandomInt(3,8);  //random between 2-3
  console.log('pMax_guests: ' + pMax_guests + ' pNightly_price: ' + pNightly_price + 
                ' pCleaning_fee: ' + pCleaning_fee + ' pService_fee: ' + pService_fee + ' pTaxes_fees: ' + pTaxes_fees + 
                ' pBulkDiscount: ' + pBulkDiscount + ' pRequired_Week_Booking_Days: ' + pRequired_Week_Booking_Days);

  var pRequired_Weekend_Booking_Days = getRandomInt(3,8);  //random between 3-7
  console.log('pMax_guests: ' + pMax_guests + ' pNightly_price: ' + pNightly_price + 
                ' pCleaning_fee: ' + pCleaning_fee + ' pService_fee: ' + pService_fee + ' pTaxes_fees: ' + pTaxes_fees + 
                ' pBulkDiscount: ' + pBulkDiscount + ' pRequired_Weekend_Booking_Days: ' + pRequired_Weekend_Booking_Days);

  //INSERT QUERY FOR properties DB HERE


  var bProperty_ID = i //random from the ids available in properties table (0-100)
  var bUser_ID = 1; //just going to be 1 user table for stretch goal.

  var startOfMonth = moment().format();
  var endOfMonth   = moment().endOf('month').format();
  populateBookedDates(startOfMonth, endOfMonth);

  var startOfSecondMonth = moment().startOf('month').add(1, 'months').format();
  var endOfSecondMonth   = moment().endOf('month').add(1, 'months').format();
  populateBookedDates(startOfSecondMonth, endOfSecondMonth);

  var startOfThirdMonth = moment().startOf('month').add(2, 'months').format();
  var endOfThirdMonth   = moment().endOf('month').add(2, 'months').format();
  populateBookedDates(startOfThirdMonth, endOfThirdMonth);

  var startOfFourthMonth = moment().startOf('month').add(3, 'months').format();
  var endOfFourthMonth   = moment().endOf('month').add(3, 'months').format();
  populateBookedDates(startOfFourthMonth, endOfFourthMonth);
}



//USE THIS CODE TOMORROW TO BUILD DATABASE SEED. WILL NEED TO ADD PROMISES ETC
// db.Properties.create({ pMax_guests: pMax_guests,
//                        pNightly_price: pNightly_price,
//                        pCleaning_fee: pCleaning_fee,
//                        pService_fee: pService_fee,
//                        pTaxes_fees: pTaxes_fees,
//                        pBulkDiscount: pBulkDiscount,
//                        pRequired_Week_Booking_Days: pRequired_Week_Booking_Days,
//                        pRequired_Weekend_Booking_Days: pRequired_Weekend_Booking_Days}).then(property => {
//   console.log("auto-generated property ID:", property.pID);
// }).catch(err => console.log(err));

// var date = moment().format('YYYY-MM-DD')
// db.Booked.create({
//       bProperty_ID: 1,
//       bUser_ID: 1,
//       Date: date
//   }).then(() => {
//                 console.log("auto-generated property ID:");
//               })
//                 .catch(err => console.log(err));
                    



// // momentJS
// var randomOct = faker.date.between("10/10/2019", "10/31/2019");
// let formattedDate = moment(randomOct).format();
// console.log(moment().format());
// console.log(startOfMonth);

// var startOfMonth = moment().startOf('month').format();
// var endOfMonth   = moment().endOf('month').format();
// console.log(startOfMonth);
// console.log(endOfMonth);

// var startOfSecondMonth = moment().startOf('month').add(1, 'months').format();
// var endOfSecondMonth   = moment().endOf('month').add(1, 'months').format();
// console.log(startOfSecondMonth);
// console.log(endOfSecondMonth);

// var startOfThirdMonth = moment().startOf('month').add(2, 'months').format();
// var endOfThirdMonth   = moment().endOf('month').add(2, 'months').format();
// console.log(startOfThirdMonth);
// console.log(endOfThirdMonth);

// var startOfFourthMonth = moment().startOf('month').add(3, 'months').format();
// var endOfFourthMonth   = moment().endOf('month').add(3, 'months').format();
// console.log(startOfFourthMonth);
// console.log(endOfFourthMonth);