const { getProductByIdModel } = require('../models/productModel');
const { createSaleModel, findSaleByIdModel, listAllSalesModel } = require('../models/salesModel');
const { createMessage } = require('../utils/functions');

const createSaleService = async (bodySale) => {
  const product = await getProductByIdModel(bodySale[0].productId);
  const validateHex = /[0-9A-Fa-f]{6}/g;
  if (!validateHex.test(bodySale[0].productId)
  || typeof bodySale[0].quantity !== 'number'
  || bodySale[0].quantity <= 0) throw createMessage('Wrong product ID or invalid quantity');
  if (!product) throw createMessage('Wrong product ID or invalid quantity');
  const { id } = await createSaleModel(bodySale);
  return {
    _id: id,
    itensSold: [
      ...bodySale,
    ],
  };
};

const listSaleServiceById = async (id) => {
  const error = {
    notfound: true,
    code: 'not_found',
    message: 'Sale not found',
  };
  const validateHex = /[0-9A-Fa-f]{6}/g;
  if (!validateHex.test(id)) throw error;
  const sale = await findSaleByIdModel(id);
  if (!sale) throw error;
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

module.exports = {
  createSaleService,
  listSaleServiceById,
  listAllSalesService,
};
