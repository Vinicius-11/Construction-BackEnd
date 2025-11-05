//  criar rota para ligar o swagger
const express = require("express");
const YAML = require("yaml");
// firesync ler arquivo
const fs = require("fs");
// isso aqui faz ficar em html
const swaggerUi = require("swagger-ui-express");

// passar caminho e carregar o arquivo swagger.yaml
const file = fs.readFileSync("./swagger.yaml", "utf-8");

// valida o formato yaml
const swaggerDoc = YAML.parse(file);

// trabalhar as rotas
const router = express.Router();

// carregar a aplicação do swagger UI
router.use("/", swaggerUi.serve);

// renderizar a documentação
router.get("/", swaggerUi.setup(swaggerDoc));




module.exports = router;