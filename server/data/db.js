const sqlInfo = require('../config/sqlConfig.js');
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('reservations', 'root', sqlInfo.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

