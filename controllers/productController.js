const {
  productCreateService,
  getProductByIdService,
  getAllProductsService,
  productUpdateService,
  productDeleteService,
} = require('../services/productService');

const productCreateController = async (req, res, next) => {
  try {
    const product = await productCreateService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllProductsController = async (req, res, next) => {
  try {
    const allProducts = await getAllProductsService(req.q);
  return res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const productUpdateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdated = await productUpdateService(id, req.body);
    return res.status(200).json(productUpdated);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const productDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productDeleteService(id);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  productCreateController,
  getProductByIdController,
  getAllProductsController,
  productUpdateController,
  productDeleteController,
};
