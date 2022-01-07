const express = require('express');
const {
  productCreateController,
  getProductByIdController,
  getAllProductsController,
} = require('../controllers/productController');

const routeProduct = express.Router();

routeProduct.get('/:id', getProductByIdController);

routeProduct.get('/', getAllProductsController);

routeProduct.post('/', productCreateController);

module.exports = routeProduct;
