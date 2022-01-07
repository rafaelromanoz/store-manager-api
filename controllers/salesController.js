const { createSaleService } = require('../services/salesService');

const createSaleController = async (req, res, next) => {
  try {
    const sale = await createSaleService(req.body);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createSaleController,
};
