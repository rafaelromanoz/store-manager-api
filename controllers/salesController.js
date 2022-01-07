const { createSaleService,
  listSaleServiceById,
  listAllSalesService } = require('../services/salesService');

const createSaleController = async (req, res, next) => {
  try {
    const sale = await createSaleService(req.body);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listSaleControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await listSaleServiceById(id);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listAllSalesController = async (req, res, next) => {
  try {
    const sales = await listAllSalesService();
    return res.status(200).json(sales);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  createSaleController,
  listSaleControllerById,
  listAllSalesController,
};
