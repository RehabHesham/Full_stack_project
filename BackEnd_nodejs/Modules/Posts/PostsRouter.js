const express = require('express');
const { deletePost, editPost, addPost, getPostByID, getPosts } = require('./PostController.js')

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostByID);
postsRouter.post('/', addPost);
postsRouter.put('/:id', editPost);
postsRouter.delete('/:id', deletePost);

module.exports = postsRouter;