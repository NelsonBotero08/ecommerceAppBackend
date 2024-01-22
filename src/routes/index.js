const express = require("express");
const userRouter = require("./user.router");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const tallaRouter = require("./talla.router");
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use('/products',productRouter)
router.use('/categories',categoryRouter)
router.use('/tallas',tallaRouter)

module.exports = router;
