const express = require('express');
const {
  productCreateController,
  getProductByIdController,
  getAllProductsController,
  productUpdateController,
} = require('../controllers/productController');

const routeProduct = express.Router();

routeProduct.get('/:id', getProductByIdController);

routeProduct.get('/', getAllProductsController);

routeProduct.post('/', productCreateController);

routeProduct.put('/:id', productUpdateController);

module.exports = routeProduct;
