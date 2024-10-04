import { Request, Response } from "express";
import { CarroDto  } from "../models/carro-dto";
import xss from "xss";

const database = require('../../db');
const Carro = require('../types/carro');

export class AutomoveisController {

    async cadastrarAutomovel(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies CarroDto;
            await database.sync();
            const resultadoCreate = await Carro.create(body)
            return _resp.status(200).json(resultadoCreate);
        } catch (error: any) {
            return _resp.status(200).json("Parâmetros incorretos ou placa informada já existe.");
        }
    }
    async atualizarAutomovel(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies CarroDto;
            await database.sync();
            const carro = await Carro.findByPk(body.id);
            carro.placa = body.placa;
            carro.cor = body.cor;
            carro.marca = body.marca;
            const resultadoUpdate = await carro.save();
            return _resp.status(200).json(resultadoUpdate);
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível atualizar o veículo.");
        }
    }

    async excluirAutomovel(_req: Request, _resp: Response): Promise<any> {
        try {
            const body = _req.body satisfies CarroDto;
            await database.sync();
            const carro = await Carro.findByPk(body.id);
            const resultadoDelete = await carro.destroy();
            return _resp.status(200).json(resultadoDelete);
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível excluir o veículo.");
        }
    }

    async recuperarAutomovelPorId(_req: Request, _resp: Response): Promise<any> {
        try {
            let { id } = _req.params;
            // Isso irá sanitizar a id para evitar códigos maliciosos
            id = xss(id);
            await database.sync();
            const carro = await Carro.findOne({
                where: { id: id }
            });
            if (carro) {
                return _resp.status(200).json(carro.toJSON());
            } else {
                return _resp.status(200).json("Carro não encontrado.");
            };
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível recuperar o veículo.");
        }
    }
    async recuperarTodosAutomoveis(_req: Request, _resp: Response): Promise<any> {
        try {
            let cor = _req.query.cor as string;
            let marca = _req.query.marca as string;
            // Isso irá sanitizar a placa para evitar códigos maliciosos
            cor = xss(cor);
            marca = xss(marca);
            await database.sync();

            const where: any = {};
            if (cor) {
                where.cor = cor; // adiciona a condição para cor se fornecido
            };
            if (marca) {
                where.marca = marca; // adiciona a condição para marca se fornecido
            };

            const carros = await Carro.findAll({ where });
            if (carros) {
                return _resp.status(200).json(carros);
            } else {
                return _resp.status(200).json("Nenhum carro encontrado.");
            };
        } catch (error: any) {
            return _resp.status(200).json("Não foi possível recuperar os veículos.");
        }
    }
}

