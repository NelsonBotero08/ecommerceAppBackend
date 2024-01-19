const { getAll, create, getOne, remove, update } = require('../controllers/existencia.controller');
const express = require('express');

const existenciaRouter = express.Router();

existenciaRouter.route('/')
    .get(getAll)
    .post(create);

existenciaRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = existenciaRouter;