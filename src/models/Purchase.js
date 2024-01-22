const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalMoney: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Purchase;