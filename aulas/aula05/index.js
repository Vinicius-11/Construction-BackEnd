// Importa o framework
const express = require("express");

// cria uma instância da aplicação
const app = express();

// sempre fazer antes da instancia

// middleware de aplicação
// a aplicação fica presa esperando uma resposta
app.use((req, res, next) => {
    console.log("Passei aqui")
    next();
});

// middleware de rota
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Chegou aqui");
});

router.post('/', (req, res) => {
    res.status(201).send("Inserido com sucesso")
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    if ( id == 1) return res.send("Achei");
    throw Error ("Não Achei");
})

app.use('/tarefas', router);


// middleware de Erro
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Algo de errado não está certo! ");
});

// inicia a aplicação
app.listen(3000, () => {
    console.log("App está ON!")
})