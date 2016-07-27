var db = require('../db/sequelizedb');
var Sequelize = require('sequelize');

var Household = db.define('household', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Household;
