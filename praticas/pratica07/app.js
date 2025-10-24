require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const produtosRouter = require("./routes/produtosRouter");
app.use("/produtos", produtosRouter);

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;
mongoose
  .connect(url)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

module.exports = app;
