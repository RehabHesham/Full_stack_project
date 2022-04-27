const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, "Post's userId is required"]
    },
    title: {
        type: String,
        required: [true, "Post's title is required"]
    },
    body: {
        type: String,
        required: [true, "Post's body is required"]
    }
}, { versionKey: false });

module.exports = schema;
