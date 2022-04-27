const mongoose = require('mongoose');
const schema = require('./CommentSchema.js');

const commentModule = mongoose.model('comment', schema, 'Comments');

module.exports = commentModule;