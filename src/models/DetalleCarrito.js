const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const DetalleCarrito = sequelize.define('detallecarrito', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = DetalleCarrito;