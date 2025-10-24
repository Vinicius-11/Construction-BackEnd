const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

let id;

describe("Testes para o recurso /tarefas", () => {
  test("POST /produtos deve criar produto com sucesso", async () => {
    const response = await request
      .post("/produtos")
      .send({ nome: "Laranja", preco: 10.0 });

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("Laranja");
    expect(response.body.preco).toBe(10.0);
    id = response.body._id;
  });

  test("POST /produtos sem corpo deve retornar 422", async () => {
    const response = await request.post("/produtos").send({});
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  test("GET /produtos deve retornar lista de produtos", async () => {
    const response = await request.get("/produtos");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /produtos/:id deve retornar produto existente", async () => {
    const response = await request.get(`/produtos/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", id);
    expect(response.body).toHaveProperty("nome", "Laranja");
    expect(response.body).toHaveProperty("preco", 10.0);
  });

  test("GET /produtos/0 deve retornar 400", async () => {
    const response = await request.get("/produtos/0");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("GET /produtos inexistente deve retornar 404", async () => {
    const response = await request.get("/produtos/000000000000000000000000");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });

  test("PUT /produtos/:id deve atualizar produto", async () => {
    const response = await request
      .put(`/produtos/${id}`)
      .send({ nome: "Laranja Pera", preco: 18.0 });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Laranja Pera");
    expect(response.body.preco).toBe(18.0);
  });

  test("PUT /produtos/:id sem corpo deve retornar 422", async () => {
    const response = await request.put(`/produtos/${id}`).send({});
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  test("PUT /produtos/0 deve retornar 400", async () => {
    const response = await request
      .put("/produtos/0")
      .send({ nome: "Teste", preco: 10 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("PUT /produtos inexistente deve retornar 404", async () => {
    const response = await request
      .put("/produtos/000000000000000000000000")
      .send({ nome: "Teste", preco: 10 });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });

  test("DELETE /produtos/:id deve excluir produto", async () => {
    const response = await request.delete(`/produtos/${id}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /produtos/0 deve retornar 400", async () => {
    const response = await request.delete("/produtos/0");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("DELETE /produtos/:id inexistente deve retornar 404", async () => {
    const response = await request.delete(`/produtos/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });
});
