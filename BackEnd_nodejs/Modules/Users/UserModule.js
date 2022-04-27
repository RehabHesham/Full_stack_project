const mongoose = require('mongoose');
const schema = require('./UserSchema');

const userModule = mongoose.model('user', schema, 'Users');

module.exports = userModule;