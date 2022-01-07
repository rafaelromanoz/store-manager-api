const express = require('express');
const { productCreateController } = require('../controllers/productController');

const routeProduct = express.Router();

routeProduct.post('/', productCreateController);

module.exports = routeProduct;
