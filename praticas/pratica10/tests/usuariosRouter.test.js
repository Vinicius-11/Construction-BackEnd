const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const url = '/usuarios'

let id = null;
let token = null;

describe('/usuarios', ()=>{
    test('POST /usuarios', async ()=>{
        const response = await request.post(url).send({
            "email": "usuario@email.com", 
            "senha": "abcd1234" 
        });
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toMatch('usuario@email.com');
        id = response.body._id;        
    });
    test('POST /usuarios', async ()=>{
        const response = await request.post(url).send({})
        expect(response.status).toBe(422);
        expect(response.body.msg).toMatch('Email e Senha são obrigatórios');
    });
    test('POST /usuarios/login', async ()=>{
        const response = await request.post(`${url}/login`).send({
             "usuario": "usuario@email.com", 
             "senha": "abcd1234"
        })
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /usuarios/login', async ()=>{
        const response = await request.post(`${url}/login`).send({})
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Credenciais inválidas');
    });
    test('POST /usuarios/renovar', async ()=>{
        const response = await request.post(`${url}/renovar`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /usuarios/renovar', async ()=>{
        const response = await request.post(`${url}/renovar`).set("authorization",`Bearer 123456789`);
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Token inválido');
    });
    test('DELETE /usuarios/${id}', async ()=>{
        const response = await request.delete(`${url}/${id}`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(204);   
    });
})