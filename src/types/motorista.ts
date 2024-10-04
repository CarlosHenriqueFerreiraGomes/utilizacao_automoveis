const Sequelize2 = require('sequelize');
const database2 = require('../../db');

const Motorista = database2.define('motorista', {
    id: {
        type: Sequelize2.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize2.STRING,
        allowNull: false
    }
});

module.exports = Motorista;