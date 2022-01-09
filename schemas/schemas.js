const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { createMessage } = require('../utils/functions');

const bodySchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
    'number.base': '"quantity" must be a number',
  }),
});

const isValid = (array) => {
  if (
    array.some(({ productId }) => !ObjectId.isValid(productId))
    || array.some(({ quantity }) => typeof quantity !== 'number')
    || array.some(({ quantity }) => quantity <= 0)) {
      throw createMessage('Wrong product ID or invalid quantity');
    }
};

module.exports = {
  bodySchema,
  isValid,
};
