const express = require('express');
const { deletePost, editPost, addPost, getPostByID, getPosts } = require('./PostController')
const { authorizeUser } = require('../../Middlewares/VerifyUserToken')

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostByID);
postsRouter.post('/', authorizeUser, addPost);
postsRouter.put('/:id', authorizeUser, editPost);
postsRouter.delete('/:id', authorizeUser, deletePost);

module.exports = postsRouter;