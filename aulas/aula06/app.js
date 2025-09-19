const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
// importando TAREFAS.JS para o APP
const tarefaRouter = require("./routes/tarefas");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
// /tarefas PARA UTILIZAR O CODIGO DO TAREFAS.JS
app.use("/tarefas", tarefaRouter);

module.exports = app;
