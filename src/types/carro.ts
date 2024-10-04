const Sequelize = require('sequelize');
const database = require('../../db');

const Carro = database.define('carro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Carro;