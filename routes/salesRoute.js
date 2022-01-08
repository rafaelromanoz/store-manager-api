const express = require('express');

const { createSaleController,
  listSaleControllerById,
  listAllSalesController,
  updateSalesController,
  deleteSaleController,
} = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', createSaleController);

salesRoute.get('/:id', listSaleControllerById);

salesRoute.get('/', listAllSalesController);

salesRoute.put('/:id', updateSalesController);

salesRoute.delete('/:id', deleteSaleController);

module.exports = salesRoute;
