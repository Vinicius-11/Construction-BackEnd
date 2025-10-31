const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("Testes das rotas de autenticação e produtos", () => {
  let token;
  let novoToken;

  test("GET /produtos deve retornar 401 e msg 'Não autorizado'", async () => {
    const response = await request.get("/produtos");

    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("msg", "Não autorizado");
  });

  test("GET /produtos com token inválido deve retornar 401 e msg 'Token inválido'", async () => {
    const response = await request
      .get("/produtos")
      .set("authorization", "Bearer 123456789"); // importante: usar formato Bearer

    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("msg", "Token inválido");
  });

  test("POST /usuarios/login deve retornar 200 e conter um token", async () => {
    const response = await request
      .post("/usuarios/login")
      .send({ usuario: "email@exemplo.com", senha: "abcd1234" });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("token");

    token = response.body.token;
    expect(token).toBeDefined();
  });

  test("GET /produtos com token válido deve retornar 200 e JSON", async () => {
    const response = await request
      .get("/produtos")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
  });

  test("POST /usuarios/renovar com token válido deve retornar 200 e conter novo token", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("token");

    novoToken = response.body.token;
    expect(novoToken).toBeDefined();
  });

  test("GET /produtos com novo token deve retornar 200 e JSON", async () => {
    const response = await request
      .get("/produtos")
      .set("authorization", `Bearer ${novoToken}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
  });
});
