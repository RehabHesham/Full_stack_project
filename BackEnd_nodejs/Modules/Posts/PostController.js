const customError = require('../../Helpers/CustomError');
const posts = require('./postModule');

exports.getPosts = async (req, res, next) => {
    try {
        const postsList = await posts.find();
        res.send(postsList);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.getPostByID = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await posts.findById(id);
        res.send(post);
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't get data", []));
    }
}

exports.addPost = async (req, res, next) => {
    try {
        const { title, body, userId } = req.body;
        const newPost = { title, body, userId };
        const post = await posts.create(newPost);
        res.send({ status: "added sucessfully", ...post._doc });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't add data", []));
    }
}

exports.editPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        let post = {};
        title ? post.title = title : null;
        body ? post.body = body : null;
        await posts.where({ _id: id }).update({ $set: post });
        res.send({ status: "updated sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't edit data", []));
    }
}

//TODO need to delete post's comments
exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await posts.deleteOne({ _id: id });
        if (result.deletedCount == 0) next(customError(422, "INVALID_DATA", "invalid id value", []));
        res.send({ status: "deleted sucessfully" });
    } catch (error) {
        next(customError(500, "SERVER_ERROR", "can't delete data", []));
    }
}