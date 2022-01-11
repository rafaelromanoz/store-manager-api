const sinon = require('sinon');
const { expect } = require('chai');

const SaleController = require('../../controllers/salesController');
const ProductController = require('../../controllers/productController');
const SaleService = require('../../services/salesService');
const ProductService = require('../../services/productService');

describe('Ao chamar o controller de createProduct', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
    const next = () => {
     return  { code: 'invalid_data', message: '"quantity" is required' }
    };

    before(() => {
      request.body = {
        name: 'Garrafa'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'productCreateService')
        .resolves({ code: 'invalid_data', message: '"quantity" is required' });
    });
    after(() => {
      ProductService.productCreateService.restore();
    });

    it('é chamado com um objeto com a propriedade code', async () => {
      try {
        await SaleController.createSaleController(request, response, next);
      } catch (error) {
        expect(error).to.be.an('object').with.a.property('code');
      }
    });
    it('é chamado o status com o código 422', async () => {
      try {
        await SaleController.createSaleController(request, response, next);
      } catch (error) {
        expect(error.status.calledWith(422)).to.be.equal(true);
      }
    });
  });
  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = () => {
      return  { code: 'invalid_data', message: '"quantity" is required' }
     };

    before(() => {
      request.body = {
        name: 'Garrafa',
        quantity: 400
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'productCreateService')
        .resolves({
          _id: "61dd755dcd5e025fb880967d",
	        name: "blab",
	        quantity: 1000
        });
    });
    after(() => {
      ProductService.productCreateService.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.productCreateController(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(false);
    });

    it('é chamado com o objeto de resposta certo', async () => {
      await ProductController.productCreateController(request, response, next);

      expect(response.json.calledWith({
          _id: "61dd755dcd5e025fb880967d",
	        name: "blab",
	        quantity: 1000
      })).to.be.equal(false);
    });
  });
});
