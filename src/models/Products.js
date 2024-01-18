const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Product = sequelize.define("product", {
  campo1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
