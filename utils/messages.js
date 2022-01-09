const errorCreate = {
  notfound: true,
  code: 'stock_problem',
  message: 'Such amount is not permitted to sell',
};

const errorList = {
  notfound: true,
  code: 'not_found',
  message: 'Sale not found',
};

module.exports = {
  errorCreate,
  errorList,
};
