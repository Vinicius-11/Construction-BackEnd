const express = require("express");
const router = express.Router();
const { verificarToken, gerarToken, renovarToken } = require("../middlewares/authMiddleware");

router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "email@exemplo.com" && senha === "abcd1234") {
    const payload = { email: usuario, nome: "Usuário Teste" };
    const token = gerarToken(payload);
    return res.status(200).json({ token });
  }

  return res.status(401).json({ msg: "Credenciais inválidas" });
});

router.post("/renovar", verificarToken, renovarToken);

module.exports = router;
