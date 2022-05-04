const express = require('express');
console.log(require('./CommentController'));
const { deleteComment, editComment, addComment, getCommentByID, getComments, getCommentByPostID } = require('./CommentController')
const { authorizeUser } = require('../../Middlewares/VerifyUserToken')

const commentsRouter = express.Router();

commentsRouter.get('/', getComments);
commentsRouter.get('/:id', getCommentByID);
commentsRouter.get('/post/:id', getCommentByPostID);
commentsRouter.post('/', authorizeUser, addComment);
commentsRouter.put('/:id', authorizeUser, editComment);
commentsRouter.delete('/:id', authorizeUser, deleteComment);

module.exports = commentsRouter;