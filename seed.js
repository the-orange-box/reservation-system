var faker = require('faker');
var moment = require('moment');
moment().format();

//min to [max]
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max-min));
}

//momentJS
// var randomOct = faker.date.between("10/10/2019", "10/31/2019");
// let formattedDate = moment(randomOct).format();

//users
var username = faker.name.findName();
console.log('username: ' + username);
//INSERT QUERY FOR USER DATABASE HERE

//booked
for (let i = 1; i <= 100; i++) {

  var pMax_guests = getRandomInt(4,13); //fandom 4-12
  var pNightly_price = getRandomInt(89, 326);//average 160.47  89.00 - 325.00
  var pCleaning_fee = getRandomInt(35,81); //average $50      35 - 80
  var pService_fee = 0.13;  //13%             .13 of pNightly_price + pCleaning_Fee
  
  var pTaxes_fees;
  if(getRandomInt(0,2)) {
    pTaxes_fees = getRandomInt(3,10); //random between 3-9   RANDOM WHETHER IT WILL SHOW UP OR NOT NULL
  } else {
    pTaxes_fees = null;
  }
  
  var pBulkDiscount;
  if(getRandomInt(0,2)) {
    pBulkDiscount = 0.95;  //bulk discount 5% for 7 day rentals  //RANDOM WHETHER IT WILL SHOW UP OR NOT
  } else {
    pBulkDiscount = null;
  }
  
  var pRequired_booking_days = getRandomInt(3,8);  //random between 3-7
  console.log('pMax_guests: ' + pMax_guests + ' pNightly_price: ' + pNightly_price + 
                ' pCleaning_fee: ' + pCleaning_fee + ' pService_fee: ' + pService_fee + ' pTaxes_fees: ' + pTaxes_fees + 
                ' pBulkDiscount: ' + pBulkDiscount + ' pRequired_booking_days: ' + pRequired_booking_days);
  //INSERT QUERY FOR properties DB HERE


  var bProperty_ID = i //random from the ids available in properties table (0-100)
  var bUser_ID = 1; //just going to be 1 user table for stretch goal.

  var bookedDatesPerOct = getRandomInt(3, 11);
  for (let j = 0; j < bookedDatesPerOct; j++) {
    var randomOct = faker.date.between("10/10/2019", "10/31/2019"); //3-10 random dates taken a month (Oct-2019 - Jan-2020)
    console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + randomOct);
    //INSERT QUERY FOR booked DB HERE
  }
 
  var bookedDatesPerNov = getRandomInt(3, 11);
  for (let j = 0; j < bookedDatesPerNov; j++) {
    var randomNov = faker.date.between("11/01/2019", "11/30/2019");
    console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + randomNov);
    //INSERT QUERY FOR booked DB HERE
  }

  var bookedDatesPerDec = getRandomInt(3, 11);
  for (let j = 0; j < bookedDatesPerDec; j++) {
    var randomDec = faker.date.between("12/01/2019", "12/31/2019");
    console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + randomDec);
    //INSERT QUERY FOR booked DB HERE 
  }
 
  var bookedDatesPerJan = getRandomInt(3, 11);
  for (let j = 0; j < bookedDatesPerJan; j++) {
    var randomJan = faker.date.between("01/01/2020", "01/31/2020");
    console.log('bProperty_ID: ' + bProperty_ID + ' bUser_ID: ' + bUser_ID + ' Date: ' + randomJan);
    //INSERT QUERY FOR booked DB HERE
  }
}
