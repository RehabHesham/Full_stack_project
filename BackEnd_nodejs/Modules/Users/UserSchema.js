const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User's name is required"]
    },
    age: {
        type: Number,
        required: [true, "User's age is required"]
    },
    username: {
        type: String,
        required: [true, "User's username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "User's email is required"],
        validate: {
            validator: (v) => Promise.resolve(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(v)),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "User's password is required"]
    }
}, { versionKey: false })

module.exports = schema;