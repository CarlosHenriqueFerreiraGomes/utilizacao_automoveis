import { Request, Response } from "express";
import { Op } from 'sequelize';
import { MotoristaDto } from "../models/motorista-dto";
import xss from "xss";

const database = require('../../db');
const Motorista = require('../types/motorista');

export class MotoristasController {

    async cadastrarMotorista(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies MotoristaDto;
            await database.sync();
            const resultadoCreate = await Motorista.create(body)
            return _resp.status(200).json(resultadoCreate);
        } catch (error: any) {
            return _resp.status(200).json("Parâmetros incorretos.");
        }
    }
    async atualizarMotorista(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies MotoristaDto;
            await database.sync();
            const motorista = await Motorista.findByPk(body.id);
            motorista.nome = body.nome;
            const resultadoUpdate = await motorista.save();
            return _resp.status(200).json(resultadoUpdate);
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível atualizar o motorista.");
        }
    }

    async excluirMotorista(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies MotoristaDto;
            await database.sync();
            const motorista = await Motorista.findByPk(body.id);
            const resultadoDelete = await motorista.destroy();
            return _resp.status(200).json(resultadoDelete);
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível excluir o motorista.");
        }
    }

    async recuperarMotoristaPorId(_req: Request, _resp: Response): Promise<any> {
        try {
            let { id } = _req.params;
            // Isso irá sanitizar a id para evitar códigos maliciosos
            id = xss(id);
            await database.sync();
            const motorista = await Motorista.findOne({
                where: { id: id }
            });
            if (motorista) {
                return _resp.status(200).json(motorista.toJSON());
            } else {
                return _resp.status(200).json("Motorista não encontrado.");
            };
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível recuperar o motorista.");
        }
    }
    async recuperarTodosmotoristas(_req: Request, _resp: Response): Promise<any> {
        try {
            let nome = _req.query.nome as string;
            // Isso irá sanitizar a placa para evitar códigos maliciosos
            nome = xss(nome);
            await database.sync();

            const motoristas = await Motorista.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${nome}%`
                    }
                }
            });
            if (motoristas) {
                return _resp.status(200).json(motoristas);
            } else {
                return _resp.status(200).json("Nenhum motorista encontrado.");
            };
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível recuperar os motoristas.");
        }
    }
}

