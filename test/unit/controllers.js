const sinon = require("sinon");
const { expect } = require("chai");

const SaleController = require("../../controllers/salesController");
const ProductController = require("../../controllers/productController");
const SaleService = require("../../services/salesService");
const ProductService = require("../../services/productService");
const schemas = require("../../schemas/schemas");

describe("Ao chamar o controller de createProduct", () => {
  describe("quando o payload informado não é válido", () => {
    const response = {};
    const request = {};
    const next = () => {
      return { code: "invalid_data", message: '"quantity" is required' };
    };
    before(() => {
      request.body = {
        name: "Garrafa",
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductService, "productCreateService")
        .resolves({ code: "invalid_data", message: '"quantity" is required' });
    });
    after(() => {
      ProductService.productCreateService.restore();
    });

    it("é chamado com um objeto com a propriedade code", async () => {
      try {
        await SaleController.createSaleController(request, response, next);
      } catch (error) {
        expect(error).to.be.an("object").with.a.property("code");
      }
    });
    it("é chamado o status com o código 422", async () => {
      try {
        await SaleController.createSaleController(request, response, next);
      } catch (error) {
        expect(error.status.calledWith(422)).to.be.equal(true);
      }
    });
  });
  describe("quando é inserido com sucesso", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      request.body = {
        name: "Garrafa",
        quantity: 400,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, "productCreateService").resolves({
        _id: "61dd755dcd5e025fb880967d",
        name: "blab",
        quantity: 1000,
      });
    });
    after(() => {
      ProductService.productCreateService.restore();
    });

    it("é chamado o status com o código 201", async () => {
      try {
        await ProductController.productCreateController(
          request,
          response,
          next
        );
        expect(response.status.calledWith(201)).to.be.equal(true);
      } catch (error) {
        expect(error).to.be.an("object").with.a.property("message");
      }
    });

    it("é chamado com o objeto de resposta certo", async () => {
      await ProductController.productCreateController(request, response, next);
      expect(
        response.json.calledWith({
          _id: "61dd755dcd5e025fb880967d",
          name: "blab",
          quantity: 1000,
        })
      ).to.be.equal(false);
    });
  });

  describe("Listar todos produtos", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "getAllProductsService").resolves({
        products: [
          { _id: "61ddb7f77b90715289d63755", name: "Garrafa", quantity: 400 },
        ],
      });
    });
    after(() => {
      ProductService.getAllProductsService.restore();
    });
    it("Se está retornando o status correto", async () => {
      await ProductController.getAllProductsController(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe("Pegar produto por id", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = "61ddb7f77b90715289d63755";
      sinon.stub(ProductService, "getProductByIdService").resolves({
        _id: "61ddb7f77b90715289d63755",
        name: "Garrafa",
        quantity: 400,
      });
    });
    after(() => {
      ProductService.getProductByIdService.restore();
    });
    it("Se está retornando o status correto", async () => {
      await ProductController.getProductByIdController(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  });
  describe("Update produto controller", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = "61ddb7f77b90715289d63755";
      request.body = {
        name: "Caderno",
        quantity: 955,
      };
      sinon.stub(ProductService, "productUpdateService").resolves({
        _id: "61ddb89216ce1354bf78d901",
        name: "Caderno",
        quantity: 955,
      });
    });
    after(() => {
      ProductService.productUpdateService.restore();
    });
    it("Se está retornando o status correto", async () => {
      await ProductController.productUpdateController(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe("Delete product controller", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = "61ddb7f77b90715289d63755";
      sinon.stub(ProductService, "productDeleteService").resolves(1);
    });
    after(() => {
      ProductService.productDeleteService.restore();
    });
    it("Se está retornando o status correto", async () => {
      await ProductController.productDeleteController(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  });
  describe("Testando sales all", () => {
    const response = {};
    const request = {};
    const next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = "61ddb7f77b90715289d63755";
      sinon.stub(SaleService, "listAllSalesService").resolves(response);
    });
    after(() => {
      SaleService.listAllSalesService.restore();
    });
    it("testando o sales vende all", async () => {
      await SaleController.listAllSalesController(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});
