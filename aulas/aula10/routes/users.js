const express = require("express");

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // simula autenticação
  if (username === "jose@iesb.br" && password === "asdf1234") {
    const payload = {
      iss: "Minha API",
      aud: "Voce",
      email: username,
      nome: "Jose",
    };
    try {
      res.json({ token: auth.gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  return res.status(401).json({ msg: "Credencias invalidas "});
});

router.post("/renovar", auth.verificarToken, auth.renovarToken);

module.exports = router;
