const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const pullsRouter = require('./routes/pulls.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(pullsRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
