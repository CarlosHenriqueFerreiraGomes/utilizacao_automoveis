const { mockRequest, mockResponse } = require("mock-req-res");
import { AutomoveisController } from "../controller/AutomoveisController";
import request from 'supertest';

const res = mockResponse({});
const req = mockRequest({});

describe("AutomoveisController", () => {

  let instance: AutomoveisController;

  beforeEach(() => {
    instance = new AutomoveisController();
  });

  it("Deve ser uma instância de AutomoveisController", () => {
    expect(instance instanceof AutomoveisController).toBeTruthy();
    expect.assertions(1);
  });

  it("cria um automóvel com sucesso", async () => {
    req.body = {
      "placa": "Placa50",
      "cor": "Preto",
      "marca": "Chevrolet"
    };
    await instance.cadastrarAutomovel(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("atualiza um automóvel com sucesso", async () => {
    req.body = {
      "id": 1,
      "placa": "Placa2",
      "cor": "Vermelho",
      "marca": "Porshe"
    };
    await instance.atualizarAutomovel(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("exclui um automóvel com sucesso", async () => {
    req.body = {
      "id": 2
    };
    await instance.excluirAutomovel(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("pega um automóvel por id com sucesso", async () => {

    const response = await request('http://localhost:9090')
    .get('/api/automoveis/get-automovel-por-id/1')
    .expect('Content-Type', /json/) // Verifica se o retorno é do tipo JSON
    .expect(200); // Verifica se o status HTTP é 200 (OK)

    // Verifica o conteúdo da resposta
    expect(response.body).toHaveProperty('id', 1); // Verifica se o ID é 1

  });

  it("get todos os automóveis com sucesso", async () => {
    req.body = {};
    await instance.recuperarTodosAutomoveis(req, res).then(function (result) {
      console.log(res)
    });
  });

});
