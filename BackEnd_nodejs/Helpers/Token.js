const util = require('util');
const jwt = require('jsonwebtoken');

const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);

exports.signToken = async (data) => {
    return await signAsync(data, process.env.SECRET_KEY);
}

exports.verifyToken = async (token) => {
    try {
        return await verifyAsync(token, process.env.SECRET_KEY);
    } catch (error) {
        throw 403;
    }
}