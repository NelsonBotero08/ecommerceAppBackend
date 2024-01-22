const { getAll, create, getOne, remove, update } = require('../controllers/purchaseDetail.controllers');
const express = require('express');

const purchaseDetailRouter = express.Router();

purchaseDetailRouter.route('/')
    .get(getAll)
    .post(create);

purchaseDetailRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = purchaseDetailRouter;