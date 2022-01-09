const { createSaleService,
  listSaleServiceById,
  listAllSalesService,
  updateSalesService,
  deleteSaleService,
} = require('../services/salesService');

const createSaleController = async (req, res, next) => {
  try {
    const sale = await createSaleService(req.body, req.q);
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

const updateSalesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSale = await updateSalesService(id, req.body);
    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deleteSaleController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSaleService = await deleteSaleService(id);
    return res.status(200).json(deletedSaleService);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  createSaleController,
  listSaleControllerById,
  listAllSalesController,
  updateSalesController,
  deleteSaleController,
};
