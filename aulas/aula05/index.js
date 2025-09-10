// Importa o FRAMEWORK
const express = require("express");

// Importa middleware de TERCEIRO
const cors = require('cors');

// Importa middleware de ROTA
const router = require('./routerTarefa');

// cria uma instância da APLICAÇÃO 
const app = express();

// middleware embutido ou integrado analisar JSON
app.use(express.json());
// middleware embutido ou integrado analisar params=valor
app.use(express.urlencoded({ extended: false}));

// middleware de terceriso
app.use(cors());

// sempre fazer antes da instancia
// middleware de APLICAÇÃO
// a APLICAÇÃO fica presa esperando uma resposta
app.use((req, res, next) => {
    console.log("Passei aqui")
    next();
});

// middleware de rota
app.use('/tarefas', router);

// middleware de Erro
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Algo de errado não está certo! ");
});

// inicia a APLICAÇÃO
app.listen(3000, () => {
    console.log("App está ON!")
})