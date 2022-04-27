const express = require('express');
const { deleteComment, editComment, addComment, getCommentByID, getComments } = require('./CommentController')

const commentsRouter = express.Router();

commentsRouter.get('/', getComments);
commentsRouter.get('/:id', getCommentByID);
commentsRouter.post('/', addComment);
commentsRouter.put('/:id', editComment);
commentsRouter.delete('/:id', deleteComment);

module.exports = commentsRouter;