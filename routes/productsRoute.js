const express = require('express');
const {
  productCreateController,
  getProductByIdController,
  getAllProductsController,
  productUpdateController,
  productDeleteController,
} = require('../controllers/productController');

const routeProduct = express.Router();

routeProduct.get('/:id', getProductByIdController);

routeProduct.get('/', getAllProductsController);

routeProduct.post('/', productCreateController);

routeProduct.put('/:id', productUpdateController);

routeProduct.delete('/:id', productDeleteController);

module.exports = routeProduct;
