var db = require('./sequelizedb');

var Household = require('../models/Household');
var Completed = require('../models/Completed');
var Task = require('../models/taskModel');
var User = require('../models/User');
var OAuth = require('../models/OAuth');

Household.hasMany(User);
User.belongsTo(Household);

Task.hasMany(Completed);
User.hasMany(Completed);

Completed.belongsTo(User);
Completed.belongsTo(Task);

User.hasMany(OAuth);

module.exports = db;
