const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    //idCategoria
});

module.exports = Product;