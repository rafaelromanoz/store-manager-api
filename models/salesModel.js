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

module.exports = {
  createSaleModel,
  findSaleByIdModel,
  listAllSalesModel,
};
