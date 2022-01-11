const { ObjectId } = require('mongodb');
const { createSaleModel,
  findSaleByIdModel,
  listAllSalesModel,
  updateSalesModel,
  deleteSaleModel,
  getManySalesByIds } = require('../models/salesModel');
const { getProductByIdModel } = require('../models/productModel');
const { createListOfObjectId } = require('../utils/functions');
const { isValid } = require('../schemas/schemas');
const { errorCreate, errorList } = require('../utils/messages');

const createMessage = (message) => ({ code: 'invalid_data', message });

const createSaleService = async (bodySale) => {
  isValid(bodySale);
    const { quantity } = await getProductByIdModel(bodySale[0].productId);
    if (quantity - bodySale[0].quantity < 0) {
      throw errorCreate;
    }
  const idObjects = createListOfObjectId(bodySale);
  const getAll = await getManySalesByIds(idObjects);
  if (getAll.length === 0) throw createMessage('Wrong product ID or invalid quantity');

  const { id } = await createSaleModel(bodySale);
  return {
    _id: id,
    itensSold: [
      ...bodySale,
    ],
  };
};

const listSaleServiceById = async (id) => {
  if (!ObjectId.isValid(id)) throw errorList;
  const sale = await findSaleByIdModel(id);
  if (!sale) throw errorList;
  return {
    _id: sale.id,
    itensSold: [
      ...sale.itensSold,
    ],
  };
};

const listAllSalesService = async () => {
  const allSales = await listAllSalesModel();
  return {
    sales: [
      ...allSales,
    ],
  };
};

const updateSalesService = async (id, reqBody) => {
  isValid(reqBody);
  const idObjects = createListOfObjectId(reqBody);
  const getAll = await getManySalesByIds(idObjects);
  if (getAll.length === 0) throw createMessage('Wrong product ID or invalid quantity');
  await updateSalesModel(id, reqBody);
  return {
    _id: id,
    itensSold: [
      ...reqBody,
    ],
  };
};

const deleteSaleService = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw createMessage('Wrong sale ID format');
  }
  const product = await findSaleByIdModel(id);
  await deleteSaleModel(id);
  return product;
};

module.exports = {
  createSaleService,
  listSaleServiceById,
  listAllSalesService,
  updateSalesService,
  deleteSaleService,
  createMessage,
};
