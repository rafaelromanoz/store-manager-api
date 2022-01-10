const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createProductModel = async ({ name, quantity }) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return { id: insertedId };
};

const findProductByNameModel = async (name) => {
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
  const { result } = await conn.collection('products').updateOne({ _id: ObjectId(id) }, {
    $set: { name, quantity },
  });
  return result;
};

const getAllProductsModel = async () => {
  const conn = await connection();
  const allProducts = await conn.collection('products').find({}).toArray();
  return allProducts;
};

const deleteProductModel = async (id) => {
  const conn = await connection();
  const { result: { ok } } = await conn.collection('products').deleteOne({ _id: ObjectId(id) });
  return ok;
};

module.exports = {
  createProductModel,
  findProductByNameModel,
  getProductByIdModel,
  getAllProductsModel,
  productUpdateModel,
  deleteProductModel,
};
