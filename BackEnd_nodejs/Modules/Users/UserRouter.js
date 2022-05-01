const express = require('express');
const { deleteUser, editUser, addUser, getUserByID, getUsers, editUserPassword, userLogin } = require('./UserController')
const { authorizeUser } = require('../../Middlewares/VerifyUserToken')

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserByID);
usersRouter.post('/', addUser);
usersRouter.put('/:id', authorizeUser, editUser);
usersRouter.put('/password/:id', authorizeUser, editUserPassword);
usersRouter.delete('/:id', authorizeUser, deleteUser);
usersRouter.post('/login', userLogin);

module.exports = usersRouter;