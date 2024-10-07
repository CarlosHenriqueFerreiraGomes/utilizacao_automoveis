const { mockRequest, mockResponse } = require("mock-req-res");
import { MotoristasController } from "../controller/MotoristasController";
import request from 'supertest';

const res = mockResponse({});
const req = mockRequest({});

describe("MotoristasController", () => {

  let instance: MotoristasController;

  beforeEach(() => {
    instance = new MotoristasController();
  });

  it("Deve ser uma instância de MotoristasController", () => {
    expect(instance instanceof MotoristasController).toBeTruthy();
    expect.assertions(1);
  });

  it("cria um motorista com sucesso", async () => {
    req.body = {
      "nome": "João"
    };
    await instance.cadastrarMotorista(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("atualiza um motorista com sucesso", async () => {
    req.body = {
      "id": 3,
      "nome": "Ricardo"
    };
    await instance.atualizarMotorista(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("exclui um motorista com sucesso", async () => {
    req.body = {
      "id": 3
    };
    await instance.excluirMotorista(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("pega um motorista por id com sucesso", async () => {

    const response = await request('http://localhost:9090')
    .get('/api/motoristas/get-motorista-por-id/1')
    .expect('Content-Type', /json/) // Verifica se o retorno é do tipo JSON
    .expect(200); // Verifica se o status HTTP é 200 (OK)

    // Verifica o conteúdo da resposta
    expect(response.body).toHaveProperty('id', 1); // Verifica se o ID é 1

  });

  it("get todos os motoristas com sucesso", async () => {
    req.body = {};
    await instance.recuperarTodosmotoristas(req, res).then(function (result) {
      console.log(res)
    });
  });

});
