const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Talla = sequelize.define('talla', {
    campo1: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Talla;