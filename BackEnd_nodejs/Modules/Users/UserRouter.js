const express = require('express');
const { deleteUser, editUser, addUser, getUserByID, getUsers } = require('./UserController')

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserByID);
usersRouter.post('/', addUser);
usersRouter.put('/:id', editUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;