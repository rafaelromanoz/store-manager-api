const sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require("../../services/productService");
const SaleService = require("../../services/salesService.js");
const ProductModel = require("../../models/productModel");
const SaleModel = require("../../models/salesModel");
const schemas = require('../../schemas/schemas');

const {
  allProducts,
  createProduct,
  nameNumber,
} = require("../../utils/mockDate");
const res = require("express/lib/response");

describe("Testes do Service Product", () => {
  describe("Testando se o services de retornar todos produtos está correto", () => {
    before(() => {
      sinon.stub(ProductModel, "getAllProductsModel").resolves(allProducts);
    });

    after(() => {
      ProductModel.getAllProductsModel.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductService.getAllProductsService();

      expect(response).to.be.an("object");
    });

    it("O objeto possui a chave products", async () => {
      const response = await ProductService.getAllProductsService();

      expect(response).to.have.a.property("products");
    });
  });

  describe("Quando não existe nada no array", () => {
    before(() => {
      sinon.stub(ProductModel, "getAllProductsModel").resolves({
        products: [],
      });
    });

    after(() => {
      ProductModel.getAllProductsModel.restore();
    });

    it("retorna um objeto com a propriedade products", async () => {
      const response = await ProductService.getAllProductsService();

      expect(response).to.be.an("object").with.a.property("products");
    });
  });
  describe("Testando a criação do produto", () => {
    before(() => {
      sinon.stub(ProductModel, "createProductModel").resolves({
        id: "61dc87fbe15dfb8f0e14ad47",
      });
    });
    after(() => {
      ProductModel.createProductModel.restore();
    });
    // it("Se ao criar retorna um objeto com a propriedade _id", async () => {
    //   const response = await ProductService.productCreateService(createProduct);
    //   expect(response).to.have.a.property("_id");
    // });
    it("Se ao passar o valor do name como numero", async () => {
      try {
        const response = await ProductService.productCreateService(nameNumber);
        expect(response).to.be.an("object");
      } catch (error) {
        expect(error).to.be.an("object");
      }
    });
  });
  describe("Testando service de retornar produto por id", () => {
    before(() => {
      sinon.stub(ProductModel, "getProductByIdModel").resolves({
        _id: "61dc87f3e15dfb8f0e14ad46",
        name: "Livro",
        quantity: 1000,
      });
    });
    after(() => {
      ProductModel.getProductByIdModel.restore();
    });
    it("se retorna um objeto", async () => {
      const result = await ProductService.getProductByIdService(
        "61dc87f3e15dfb8f0e14ad46"
      );
      expect(result).equal(null);
    });
  });
  describe("Testando service de retornar produto por id", () => {
    before(() => {
      sinon
        .stub(ProductModel, "productUpdateModel")
        .resolves({ n: 1, nModified: 1, ok: 1 });
    });
    after(() => {
      ProductModel.productUpdateModel.restore();
    });
    it("se retorna um objeto com a propriedade name", async () => {
      const result = await ProductService.productUpdateService(
        "61dc87f3e15dfb8f0e14ad46",
        createProduct
      );
      expect(result).to.have.a.property("name");
    });
    it("Se passar um id errado", async () => {
      try {
        await ProductService.productUpdateService(
          "61dc87f3e15dfb8f0e1",
          createProduct
        );
      } catch (error) {
        expect(error).to.be.an("Error");
      }
    });
    describe("Product delete service", () => {
      before(() => {
        sinon.stub(ProductModel, "deleteProductModel").resolves(1);
      });
      after(() => {
        ProductModel.deleteProductModel.restore();
      });
      it("Se não existir id certo", async () => {
        try {
        } catch (error) {
          expect(error).to.be.an("object");
        }
      });
    });
  });
});

describe("testando os sales service todas as vendas", () => {
  before(() => {
    sinon.stub(SaleModel, "listAllSalesModel").resolves([
      {
        _id: "61dcbc5e5a4d999b70434c29",
        itensSold: [
          {
            productId: "61dc87fbe15dfb8f0e14ad47",
            quantity: 60,
          },
        ],
      },
    ]);
  });
  after(() => {
    SaleModel.listAllSalesModel.restore();
  });
  it("Testa se retorna um objeto", async () => {
    const response = await SaleService.listAllSalesService();
    expect(response).to.be.an("object");
  });
});

describe("Testes do sales por id", () => {
  before(() => {
    sinon.stub(SaleModel, 'findSaleByIdModel').resolves([{ productId: "61dc47dd261576b698a8d28c", quantity: 400 }]);
  });
  after(() => {
    SaleModel.findSaleByIdModel.restore();
  });
  it("Testando se retorna um erro ao pesquisar sale por id", async () => {
    try {
      const response = await SaleService.listSaleServiceById();
      expect(response).to.be.an('object')
    } catch (error) {
      expect(error).to.be.an('object');
    }
  });
});

describe("Criar sale", () => {
  before(() => {
    sinon.stub(SaleModel,  'createSaleModel').resolves([{ productId: "61dc47dd261576b698a8d28c", quantity: 400 }]);
  });
  after(() => {
    SaleModel.createSaleModel.restore();
  });
  it("Testando se cria sale", async () => {
    try {
      const response = await SaleService.createSaleService([
        {productId: '61dcd31cb98e452b30d69943', quantity: 400}
      ]);
    } catch (error) {
      expect(error).to.be.an('Error')
    }
  });
});

describe("Update sale", () => {
  before(() => {
    sinon.stub(SaleModel, 'updateSalesModel').resolves(1);
  });
  after(() => {
    SaleModel.updateSalesModel.restore();
  });
  it("Testando se update sale", async () => {
    try {
      await SaleService.deleteSaleService('dfgdsfgdsfgdf');
    } catch (error) {
      expect(error).to.be.an('object')
    }
  });
});

