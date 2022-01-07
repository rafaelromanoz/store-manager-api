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

module.exports = {
  createProductModel,
  findProductModel,
};
