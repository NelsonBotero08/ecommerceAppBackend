const express = require("express");
const userRouter = require("./user.router");
const existenciaRouter = require("./existencia.router");
const carritoRouter = require("./carrito.router");
const detalleCarRouter = require("./detallecarrito.router");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const tallaRouter = require("./talla.router");
const purchaseRouter = require("./purchase.router");
const purchaseDetailRouter = require("./purchaseDetail.router");

const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use('/existencias', existenciaRouter)
router.use('/carrito', carritoRouter)
router.use('/detcar', detalleCarRouter)
router.use('/products',productRouter)
router.use('/categories',categoryRouter)
router.use('/tallas',tallaRouter)
router.use('/purchases', purchaseRouter)
router.use('/purchaseDetails', purchaseDetailRouter)


module.exports = router;
