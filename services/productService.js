const { ObjectId } = require('mongodb');
const { bodySchema } = require('../schemas/schemas');
const { createMessage } = require('../utils/functions');
const {
  findProductModel,
  createProductModel,
  getProductByIdModel,
  getAllProductsModel,
  productUpdateModel,
  deleteProductModel,
} = require('../models/productModel');

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
  if (!ObjectId.isValid(id)) throw createMessage('Wrong id format');
  const product = await getProductByIdModel(id);
  return product;
};

const getAllProductsService = async () => {
  const products = await getAllProductsModel();
  return {
    products: [...products],
  };
};

const productUpdateService = async (idController, bodyProduct) => {
  const { error } = bodySchema.validate(bodyProduct);
  if (error) throw createMessage(error.message);
  await productUpdateModel(idController, bodyProduct);

  return {
    _id: idController,
    name: bodyProduct.name,
    quantity: bodyProduct.quantity,
  };
};

const productDeleteService = async (id) => {
  if (!ObjectId.isValid(id)) throw createMessage('Wrong id format');
  const product = await getProductByIdModel(id);
  await deleteProductModel(id);
  return product;
};

module.exports = {
  productCreateService,
  getProductByIdService,
  getAllProductsService,
  productUpdateService,
  productDeleteService,
};
