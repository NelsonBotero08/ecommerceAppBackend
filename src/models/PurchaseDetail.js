const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const PurchaseDetail = sequelize.define('purchaseDetail', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotalMoney: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = PurchaseDetail;