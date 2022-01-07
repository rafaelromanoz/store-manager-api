const { connection } = require('./connection');

const createSaleModel = async (newProduct) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('sales').insertOne({ newProduct });

  return { id: insertedId };
};

module.exports = {
  createSaleModel,
};
