const { ObjectId } = require('mongodb');

const createMessage = (message) => ({ code: 'invalid_data', message });
const createListOfObjectId = (array) => array.map(({ productId }) => ObjectId(productId));
const listArrayIdForDelete = ({ itensSold }) => itensSold
.map(({ productId, quantity }) => ({
  id: [productId],
  quantity,
}));
module.exports = { createMessage, createListOfObjectId, listArrayIdForDelete };
