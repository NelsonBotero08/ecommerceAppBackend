const { getAll, create, getOne, remove, update } = require('../controllers/talla.controllers');
const express = require('express');

const tallaRouter = express.Router();

tallaRouter.route('/')
    .get(getAll)
    .post(create);

tallaRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = tallaRouter;