const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Existencia = sequelize.define('existencia', {
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Existencia;