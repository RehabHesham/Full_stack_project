const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    postId: {
        type: ObjectId,
        required: [true, "Comment's postId is required"]
    },
    name: {
        type: String,
        required: [true, "Comment's name is required"]
    },
    body: {
        type: String,
        required: [true, "Comment's body is required"]
    },
    email: {
        type: String,
        required: [true, "Comment's email is required"],
        validate: {
            validator: (v) => Promise.resolve(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(v)),
            message: props => `${props.value} is not a valid email!`
        }
    },
    userId: {
        type: ObjectId,
        required: [true, "Comment's userId is required"]
    }
}, { versionKey: false })

module.exports = schema;