require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`

const Router = require('./routes/apiDocsRouter');
const usuarioRouter = require('./routes/usuariosRouter');

mongoose
  .connect(url)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs',Router)
app.use('/usuarios',usuarioRouter)

module.exports = app;
