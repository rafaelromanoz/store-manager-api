const { getProductByIdModel } = require('../models/productModel');
const { createSaleModel } = require('../models/salesModel');
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

module.exports = {
  createSaleService,
};
