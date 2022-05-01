const customError = require("../Helpers/CustomError");
const token = require('../Helpers/Token');

exports.authorizeUser = async (req, res, next) => {
    const { authorization, id } = req.headers;
    const { id: userId } = await token.verifyToken(authorization);
    if (id != userId)
        next(customError(403, 'UNAUHTORIZED', 'you don\'t have permission to perform this action'));
    next();
}
