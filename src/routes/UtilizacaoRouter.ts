import { UtilizacaoController } from "../controller/UtilizacaoController";
import { Router } from "express";

const utilizacaoRouter: Router = Router();
const _utilizacaoController = new UtilizacaoController();

utilizacaoRouter.post('/utilizacao/iniciar-utilizacao-automovel', _utilizacaoController.iniciarUtilizacaoDoAutomovel);
utilizacaoRouter.post('/utilizacao/finalizar-utilizacao-automovel', _utilizacaoController.finalizarUtilizacaoDoAutomovel);
utilizacaoRouter.get('/utilizacao/get-utilizacoes', _utilizacaoController.recuperarTodasUtilizacoes);

export { utilizacaoRouter }