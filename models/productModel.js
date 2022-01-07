const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createProductModel = async ({ name, quantity }) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return { id: insertedId };
};

const findProductModel = async (name) => {
  const conn = await connection();
  const product = await conn.collection('products').findOne({ name });
  return product;
};

const getProductByIdModel = async (id) => {
  const conn = await connection();
  const product = await conn.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const productUpdateModel = async (id, { name, quantity }) => {
  const conn = await connection();
  await conn.collection('products').updateOne({ _id: ObjectId(id) }, {
    $set: { name, quantity },
  });
};

const getAllProductsModel = async () => {
  const conn = await connection();
  const allProducts = await conn.collection('products').find({}).toArray();
  return allProducts;
};

module.exports = {
  createProductModel,
  findProductModel,
  getProductByIdModel,
  getAllProductsModel,
  productUpdateModel,
};
