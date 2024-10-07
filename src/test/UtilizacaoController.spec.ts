const { mockRequest, mockResponse } = require("mock-req-res");
import { UtilizacaoController } from "../controller/UtilizacaoController";
import request from 'supertest';

const res = mockResponse({});
const req = mockRequest({});

describe("UtilizacaoController", () => {

  let instance: UtilizacaoController;

  beforeEach(() => {
    instance = new UtilizacaoController();
  });

  it("Deve ser uma instância de UtilizacaoController", () => {
    expect(instance instanceof UtilizacaoController).toBeTruthy();
    expect.assertions(1);
  });

  it("cria uma utilização com sucesso", async () => {
    req.body = {
      "dt_inicio":  new Date(),
      "dt_termino": null,
      "id_motorista": 1,
      "id_automovel": 1,
      "motivo": "Levar papel ao escritório"
    };
    await instance.iniciarUtilizacaoDoAutomovel(req, res).then(function (result) {
      console.log(res)
    });
  });

  it("finaliza uma utilização com sucesso", async () => {
    req.body = {
      "dt_termino": new Date(),
      "id_motorista": 1,
      "id_automovel": 1
    };
    await instance.finalizarUtilizacaoDoAutomovel(req, res).then(function (result) {
      console.log(res)
    });
  });


  it("pega todas as utilizações com sucesso", async () => {
    req.body = {};
    await instance.recuperarTodasUtilizacoes(req, res).then(function (result) {
      console.log(res)
    });
  });

});
