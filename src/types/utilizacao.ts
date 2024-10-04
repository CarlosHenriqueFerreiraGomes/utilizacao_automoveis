const Sequelize3 = require('sequelize');
const database3 = require('../../db');
const MotoristaModel = require('../types/motorista');
const CarroModel = require('../types/carro');

const Utilizacao = database3.define('utilizacao', {
    id: {
        type: Sequelize3.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dt_inicio: {
        type: Sequelize3.DATE,
        allowNull: false,
    },
    dt_termino: {
        type: Sequelize3.DATE,
        allowNull: true
    },
    id_motorista: {
        references: {
            model: MotoristaModel,
            key: 'id'
        },
        type: Sequelize3.INTEGER,
        allowNull: false
    },
    id_automovel: {
        references: {
            model: CarroModel,
            key: 'id'
        },
        type: Sequelize3.INTEGER,
        allowNull: false
    },
    motivo: {
        type: Sequelize3.STRING,
        allowNull: false
    }
});

module.exports = Utilizacao;