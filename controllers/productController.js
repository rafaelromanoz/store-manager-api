const { productCreateService } = require('../services/productService');

const productCreateController = async (req, res, next) => {
  try {
    const product = await productCreateService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  productCreateController,
};
