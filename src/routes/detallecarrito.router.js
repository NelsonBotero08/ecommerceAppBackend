const { getAll, create, getOne, remove, update } = require('../controllers/detallecarrito.controller');
const express = require('express');

const detalleCarRouter = express.Router();

detalleCarRouter.route('/')
    .get(getAll)
    .post(create);

detalleCarRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = detalleCarRouter;