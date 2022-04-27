const customError = require('../../Helpers/CustomError');
const users = require('./UserModule');

exports.getUsers = async (req, res, next) => {
    try {
        const usersList = await users.find();
        res.send(usersList);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.getUserByID = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await users.findById(id);
        res.send(user);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { name, age, username, email, password } = req.body;
        const newUser = new users({ name, age, username, email, password });
        try { await newUser.validate(); }
        catch (err) {
            next(customError(422, 'INVALID_DATA', 'Check input data', err))
        }
        const user = await users.create(newUser);
        res.send({ status: "added sucessfully", ...user._doc });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't add data", []));
    }
}

exports.editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, age, username, email, password } = req.body;
        let user = users.findById(id);
        user.name = name || user.name;
        user.age = age || user.age;
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        try { await user.validate(); }
        catch (err) {
            next(customError(422, 'INVALID_DATA', 'Check input data', err))
        }
        await users.where({ _id: id }).update({ $set: user });
        res.send({ status: "updated sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't edit data", []));
    }
}

//TODO need to delete users posts and comments
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await users.deleteOne({ _id: id });
        if (result.deletedCount == 0) next(customError(422, "INVALID_DATA", "invalid id value", []));
        res.send({ status: "deleted sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't delete data", []));
    }
}