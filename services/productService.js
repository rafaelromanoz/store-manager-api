const Joi = require('joi');
const {
  findProductModel,
  createProductModel,
  getProductByIdModel,
  getAllProductsModel } = require('../models/productModel');

const bodySchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',

  }),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
  }),
});

const createMessage = (message) => ({ code: 'invalid_data', message });

const productCreateService = async (bodyProduct) => {
  const { error } = bodySchema.validate(bodyProduct);
  if (error) throw createMessage(error.message);
  const nameExists = await findProductModel(bodyProduct.name);
  if (nameExists) throw createMessage('Product already exists');
  const { id } = await createProductModel(bodyProduct);
  return {
    _id: id,
    name: bodyProduct.name,
    quantity: bodyProduct.quantity,
  };
};

const getProductByIdService = async (id) => {
  /** Source:  https://stackoverflow.com/questions/30051236/argument-passed-in-must-be-a-string-of-24-hex-characters-i-think-it-is */
  const validateHex = /[0-9A-Fa-f]{6}/g;
  if (!validateHex.test(id)) throw createMessage('Wrong id format');
  const product = await getProductByIdModel(id);
  return product;
};

const getAllProductsService = async () => {
  const products = await getAllProductsModel();
  return {
    products: [...products],
  };
};

module.exports = {
  productCreateService,
  getProductByIdService,
  getAllProductsService,
};
