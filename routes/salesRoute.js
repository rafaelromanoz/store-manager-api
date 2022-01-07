const express = require('express');

const { createSaleController } = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', createSaleController);

module.exports = salesRoute;
