const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "Não autorizado" });
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SEGREDO || "segredo");
    req.payload = {
      iss: payload.iss,
      aud: payload.aud,
      email: payload.email,
      nome: payload.nome
    };
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  const expiresIn = 120;
  try {
    const token = jwt.sign(payload, process.env.JWT_SEGREDO || "segredo", { expiresIn });
    return token;
  } catch (err) {
    throw Error("Erro ao gerar token");
  }
}

function renovarToken(req, res) {
  try {
    const payload = req.payload;
    res.status(200).json({ token: gerarToken(payload) });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao renovar token" });
  }
}

module.exports = { verificarToken, gerarToken, renovarToken };
