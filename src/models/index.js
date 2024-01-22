const Category = require("./Category");
const EmailCode = require("./EmailCode");
const Product = require("./Poduct");
const User = require("./User");

EmailCode.belongsTo(User);
User.hasOne(EmailCode);

Product.belongsTo(Category);
Category.hasMany(Product);


