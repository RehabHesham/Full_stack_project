const token = require('../Helpers/Token');

exports.authorizeUser = async (req, res, next) => {
    const { authorization, id } = req.headers;
    try {
        const { id: userId } = await token.verifyToken(authorization);
        if (id != userId)
            return next(403);
        next();
    } catch (err) {
        return next(err);
    }
}
