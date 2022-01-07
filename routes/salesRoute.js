const express = require('express');

const { createSaleController,
  listSaleControllerById,
  listAllSalesController } = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', createSaleController);

salesRoute.get('/:id', listSaleControllerById);

salesRoute.get('/', listAllSalesController);

module.exports = salesRoute;
