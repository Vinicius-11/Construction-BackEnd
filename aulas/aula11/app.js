const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const apidocsRouter = require('./routes/apidocs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// entrar no api-docs e direcionar para apidocsRouter
app.use("/api-docs", apidocsRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
