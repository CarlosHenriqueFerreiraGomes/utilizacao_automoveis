import { MotoristasController } from "../controller/MotoristasController";
import { Router } from "express";

const motoristasRouter: Router = Router();
const _motoristasController = new MotoristasController();

motoristasRouter.post('/motoristas/cadastrar-motorista', _motoristasController.cadastrarMotorista);
motoristasRouter.post('/motoristas/atualizar-motorista', _motoristasController.atualizarMotorista);
motoristasRouter.post('/motoristas/excluir-motorista', _motoristasController.excluirMotorista);
motoristasRouter.get('/motoristas/get-motorista-por-id/:id', _motoristasController.recuperarMotoristaPorId);
motoristasRouter.get('/motoristas/get-motoristas', _motoristasController.recuperarTodosmotoristas);

export { motoristasRouter }