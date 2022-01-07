const {
  productCreateService,
  getProductByIdService,
  getAllProductsService } = require('../services/productService');

const productCreateController = async (req, res, next) => {
  try {
    const product = await productCreateService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getAllProductsController = async (req, res, next) => {
  try {
    const allProducts = await getAllProductsService();
  return res.status(200).json(allProducts);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  productCreateController,
  getProductByIdController,
  getAllProductsController,
};
