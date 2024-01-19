const express = require("express");
const userRouter = require("./user.router");
const existenciaRouter = require("./existencia.router");
const carritoRouter = require("./carrito.router");
const detalleCarRouter = require("./detallecarrito.router");
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use('/existencias', existenciaRouter)
router.use('/carrito', carritoRouter)
router.use('/detcar', detalleCarRouter)

module.exports = router;
