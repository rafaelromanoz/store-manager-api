const Joi = require('joi');

const bodySchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
    'number.base': '"quantity" must be a number',
  }),
});

module.exports = {
  bodySchema,
};
