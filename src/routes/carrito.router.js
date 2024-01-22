const { getAll, create, getOne, remove, update } = require('../controllers/carrito.controller');
const express = require('express');

const carritoRouter = express.Router();

carritoRouter.route('/')
    .get(getAll)
    .post(create);

carritoRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = carritoRouter;