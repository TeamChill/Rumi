var db = require('../db/sequelizedb');

var Completed = db.define('completed', {});

module.exports = Completed;
