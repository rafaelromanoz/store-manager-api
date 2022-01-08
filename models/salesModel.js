const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createSaleModel = async (newProduct) => {
  const conn = await connection();
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
  const blab = await conn.collection('sales').deleteOne({ _id: ObjectId(id) });
  return blab;
};

module.exports = {
  createSaleModel,
  findSaleByIdModel,
  listAllSalesModel,
  updateSalesModel,
  deleteSaleModel,
};
