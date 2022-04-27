const customError = require('../../Helpers/CustomError');
const comments = require('./CommentModule');

exports.getComments = async (req, res, next) => {
    try {
        const commentsList = await comments.find();
        res.send(commentsList);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.getCommentByID = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await comments.findById(id);
        res.send(comment);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.addComment = async (req, res, next) => {
    try {
        const { postId, name, body, email } = req.body;
        const newComment = new comments({ postId, name, body, email });
        try { await newComment.validate(); }
        catch (err) {
            next(customError(422, 'INVALID_DATA', 'Check input data', err))
        }
        const comment = await comments.create(newComment);
        res.send({ status: "added sucessfully", ...comment._doc });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't add data", []));
    }
}

exports.editComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, body, email } = req.body;
        let comment = comments.findById(id);
        // title ? comment.title = title : null;
        // body ? comment.body = body : null;
        comment.name = name || comment.name;
        comment.body = body || comment.body;
        comment.email = email || comment.email;
        try { await comment.validate(); }
        catch (err) {
            next(customError(422, 'INVALID_DATA', 'Check input data', err))
        }
        await comments.where({ _id: id }).update({ $set: comment });
        res.send({ status: "updated sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't edit data", []));
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await comments.deleteOne({ _id: id });
        if (result.deletedCount == 0) next(customError(422, "INVALID_DATA", "invalid id value", []));
        res.send({ status: "deleted sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't delete data", []));
    }
}