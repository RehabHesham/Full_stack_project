const express = require('express');
const morgan = require('morgan');
const postsRouter = require('./Modules/Posts');
const usersRouter = require('./Modules/Users');
const commentsRouter = require('./Modules/Comments');

const app = express();
const port = 4000;

require('dotenv').config();
require('./Database/EstablishDBConnection');

console.log("server started");

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        code: err.code || 'SERVER_ERROR',
        message: err.message || 'Somthing is wrong',
        details: err.details || []
    });
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));