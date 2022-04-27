const mongoose = require('mongoose');
const schema = require('./postSchema');

const postModule = mongoose.model('post', schema, 'Posts');

module.exports = postModule;