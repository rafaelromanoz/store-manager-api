const { ObjectId } = require('mongodb');
const { createListOfObjectId } = require('../utils/functions');
const { connection } = require('./connection');

const getManySalesByIds = async (listIds) => {
  const conn = await connection();
  const objects = await conn.collection('products').find({ _id: {
    $in: listIds,
  } }).toArray();
  return objects;
};

const createSaleModel = async (newProduct) => {
  const conn = await connection();
  const idObjects = createListOfObjectId(newProduct);
  await conn.collection('products').updateOne({ _id: {
    $in: idObjects,
  } }, { $inc: { quantity: -newProduct[0].quantity } });
  const { insertedId } = await conn.collection('sales').insertOne({ itensSold: newProduct });
  return { id: insertedId };
};

const findSaleByIdModel = async (id) => {
  const conn = await connection();
  const sale = await conn.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const listAllSalesModel = async () => {
  const conn = await connection();
  const sales = await conn.collection('sales').find({}).toArray();
  return sales;
};

const updateSalesModel = async (id, reqBody) => {
  const conn = await connection();
  await conn.collection('sales').updateOne({ _id: ObjectId(id) }, {
    $set: { itensSold: reqBody },
  });
};

const deleteSaleModel = async (id) => {
  const conn = await connection();
  const sale = await conn.collection('sales').findOne({ _id: ObjectId(id) });
  const itemId = sale.itensSold[0].productId;
  const quantOld = sale.itensSold[0].quantity;
  await conn.collection('sales').deleteOne({ _id: ObjectId(id) });
  await conn.collection('products').updateOne({ _id: ObjectId(itemId) }, {
    $inc: { quantity: +quantOld },
  });
};

module.exports = {
  createSaleModel,
  findSaleByIdModel,
  listAllSalesModel,
  updateSalesModel,
  deleteSaleModel,
  getManySalesByIds,
};
