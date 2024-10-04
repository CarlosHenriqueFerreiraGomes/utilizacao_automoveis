import { Request, Response } from "express";
import { UtilizacaoDto } from "../models/utilizacao-dto";

const database = require('../../db');
const Motorista = require('../types/motorista');
const Carro = require('../types/carro');
const Utilizacao = require('../types/utilizacao');

export class UtilizacaoController {

    async iniciarUtilizacaoDoAutomovel(_req: Request, _resp: Response): Promise<any> {
        try {

            const body = _req.body satisfies UtilizacaoDto;
            await database.sync();

            // Verifica se existe o motorista informado
            const motorista = await Motorista.findOne({
                where: { id: body.id_motorista }
            });
            if (!motorista) {
                return _resp.status(200).json("Motorista não encontrado.");
            };

            // Verifica se existe o automóvel informado
            const automovel = await Carro.findOne({
                where: { id: body.id_automovel }
            });
            if (!automovel) {
                return _resp.status(200).json("Automóvel não encontrado.");
            };

            // Verifica se o motorista está utilizando algum automóvel
            const utilizacaoMotorista = await Utilizacao.findOne({
                where: {
                    id_motorista: body.id_motorista,
                    dt_termino: null
                }
            });
            if (utilizacaoMotorista) {
                return _resp.status(200).json("Motorista já está utilizando um automóvel.");
            };

            // Verifica se o carro está sendo utilizando por outro motorista
            const utilizacaoMotoristaCarro = await Utilizacao.findOne({
                where: {
                    id_automovel: body.id_automovel,
                    dt_termino: null
                }
            });
            if (utilizacaoMotoristaCarro) {
                return _resp.status(200).json("Carro já está sendo utilizando.");
            };

            // Executa a utilização
            const resultadoCreate = await Utilizacao.create(body)
            return _resp.status(200).json(resultadoCreate);

        } catch (error: any) {
            return _resp.status(200).json("Não foi possível fazer a utilização do veículo.");
        }
    }
    async finalizarUtilizacaoDoAutomovel(_req: Request, _resp: Response): Promise<any> {
        try {

            const body = _req.body satisfies UtilizacaoDto;
            await database.sync();

            // Verifica se existe o motorista informado
            const motorista = await Motorista.findOne({
                where: { id: body.id_motorista }
            });
            if (!motorista) {
                return _resp.status(200).json("Motorista não encontrado.");
            };

            // Verifica se existe o automóvel informado
            const automovel = await Carro.findOne({
                where: { id: body.id_automovel }
            });
            if (!automovel) {
                return _resp.status(200).json("Automóvel não encontrado.");
            };

            // Busca a utilização do automóvel com o motorista
            const utilizacaoMotorista = await Utilizacao.findOne({
                where: {
                    id_motorista: body.id_motorista,
                    id_automovel: body.id_automovel,
                    dt_termino  : null,
                }
            });

            if (!utilizacaoMotorista) {
                return _resp.status(200).json("Não foi encontrado utilização para Motorista e Automóvel informado a ser finalizada.");
            };

            // Executa a finalização da utilização
            utilizacaoMotorista.dt_termino = body.dt_termino;
            const resultadoUpdate = await utilizacaoMotorista.save();
            return _resp.status(200).json(resultadoUpdate);

        } catch (error: any) {
            return _resp.status(200).json("Não foi possível finalizar a utilização do veículo.");
        }
    }


    async recuperarTodasUtilizacoes(_req: Request, _resp: Response): Promise<any> {

        // configura as associações para dizer ao Sequelize que Carro e Motorista têm um relacionamento 
        // muitos-para-muitos através do model Utilizacao.
        Carro.hasMany(Utilizacao, { foreignKey: 'id_automovel' });
        Utilizacao.belongsTo(Carro, { foreignKey: 'id_automovel' });

        Motorista.hasMany(Utilizacao, { foreignKey: 'id_motorista' });
        Utilizacao.belongsTo(Motorista, { foreignKey: 'id_motorista' });

        try {
            const utilizacoes = await Utilizacao.findAll({
                include: [
                    { model: Carro },
                    { model: Motorista }
                ],
            });
            return _resp.status(200).json(utilizacoes);
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível buscar as utilizações criadas.");
        };
    }
}

