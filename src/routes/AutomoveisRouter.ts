import { AutomoveisController } from "../controller/AutomoveisController";
import { Router } from "express";

const automoveisRouter: Router = Router();
const _automoveisController = new AutomoveisController();

automoveisRouter.post('/automoveis/cadastrar-automovel', _automoveisController.cadastrarAutomovel);
automoveisRouter.post('/automoveis/atualizar-automovel', _automoveisController.atualizarAutomovel);
automoveisRouter.post('/automoveis/excluir-automovel', _automoveisController.excluirAutomovel);
automoveisRouter.get('/automoveis/get-automovel-por-id/:id', _automoveisController.recuperarAutomovelPorId);
automoveisRouter.get('/automoveis/get-automoveis', _automoveisController.recuperarTodosAutomoveis);

export { automoveisRouter }