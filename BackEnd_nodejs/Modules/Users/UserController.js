const customError = require('../../Helpers/CustomError');
const users = require('./UserModule');
const pass = require('../../Helpers/Password');
const token = require('../../Helpers/Token.js');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const usersList = await users.find();
            res.send(usersList);
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't get data", []));
        }
    },

    getUserByID: async (req, res, next) => {
        try {
            const { id } = req.params
            const user = await users.findById(id);
            res.send(user);
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't get data", []));
        }
    },

    addUser: async (req, res, next) => {
        try {
            const { name, age, username, email, password } = req.body;
            const hashedpass = await pass.hashPassword(password);
            const newUser = new users({ name, age, username, email, password: hashedpass });
            try { await newUser.validate(); }
            catch (err) {
                next(customError(422, 'INVALID_DATA', 'Check input data', err))
            }
            const user = await users.create(newUser);
            res.send({ status: "added sucessfully", ...user._doc });
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't add data", []));
        }
    },


    editUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, age, username, email } = req.body;
            let user = await users.findById(id);
            user.name = name || user.name;
            user.age = age || user.age;
            user.username = username || user.username;
            user.email = email || user.email;
            try { await user.validate(); }
            catch (err) {
                next(customError(422, 'INVALID_DATA', 'Check input data', err))
            }
            await users.where({ _id: id }).updateOne({ $set: user });
            res.send({ status: "updated sucessfully" });
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't edit data", []));
        }
    },


    editUserPassword: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;
            const user = await users.findById(id);
            const isCorrectPassword = await pass.comparePassword(oldPassword, user.password)
            if (!isCorrectPassword)
                next(customError(401, 'UNAUTHENTICATED', 'wrong old password'));
            const hashedpass = pass.hashPassword(newPassword);
            await users.where({ _id: id }).updateOne({ $set: { password: hashedpass } });
            res.send({ status: "password updated sucessfully" });
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't edit data", []));
        }
    },

    //TODO need to delete users posts and comments
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await users.deleteOne({ _id: id });
            if (result.deletedCount == 0) next(customError(422, "INVALID_DATA", "invalid id value", []));
            res.send({ status: "deleted sucessfully" });
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't delete data", []));
        }
    },

    userLogin: async (req, res, next) => {
        try {
            const { email, username, password } = req.body;

            const user = await users.findOne({ username })
            if (!user)
                next(customError(401, 'UNAUTHENTICATED', 'wrong username, email or password'));
            if (user.email !== email)
                next(customError(401, 'UNAUTHENTICATED', 'wrong username, email or password'));
            const isCorrectPassword = await pass.comparePassword(password, user.password)
            if (!isCorrectPassword)
                next(customError(401, 'UNAUTHENTICATED', 'wrong username, email or password'));
            const accessToken = await token.signToken({ id: user.id });
            res.send({ accessToken, id: user.id, username: user.name, email: user.email });
        } catch (error) {
            next(customError(500, "SERVER_ERROR", "can't login", []));
        }
    }
}