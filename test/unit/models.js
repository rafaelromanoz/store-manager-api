const sinon = require("sinon");
const { expect } = require("chai");
const { MongoClient } = require("mongodb");
const { getConnection } = require("./mongoMockConnection");
const { ObjectId } = require("mongodb");

const ProductModel = require("../../models/productModel");
const SaleModel = require("../../models/salesModel");

describe("Cria um novo produto", () => {
  let connectionMock;

  const payloadProduct = {
    name: "Lapis",
    quantity: 1000,
  };

  const payloadSales = [
    {
      productId: "61dc47dd261576b698a8d28c",
      quantity: 400,
    },
  ];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
    await ProductModel.createProductModel(payloadProduct);
    await SaleModel.createSaleModel(payloadSales);
  });

  after(async () => {
    await connectionMock.db("StoreManager").collection("products").drop();
    MongoClient.connect.restore();
  });

  describe("Quando um produto é cadastrado com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await ProductModel.createProductModel(payloadProduct);

      expect(response).to.be.a("object");
    });

    it("Tal objeto possui a propriedade _id", async () => {
      const response = await ProductModel.createProductModel(payloadProduct);

      expect(response).to.have.a.property("id");
    });
    it("Deve existir um produto com o 'name' cadastrado", async () => {
      const { id } = await ProductModel.createProductModel(payloadProduct);
      const productCreated = await connectionMock
        .db("StoreManager")
        .collection("products")
        .findOne({ name: payloadProduct.name });
      expect(productCreated).to.be.not.null;
    });
  });
  describe("Procurando produto por name", () => {
    it("verificando se trás o produto certo", async () => {
      const response = await ProductModel.findProductByNameModel("Lapis");
      expect(response).to.be.a("object");
    });
  });
  describe("Procurando produto por id", () => {
    it("Verifica se retorna um objeto", async () => {
      const { id } = await ProductModel.createProductModel(payloadProduct);
      const response = await ProductModel.getProductByIdModel(id);
      expect(response).to.be.a("object");
    });
  });
  describe("Fazendo update de um produto", () => {
    it("Verifica se foi feito o update", async () => {
      const { id } = await ProductModel.createProductModel(payloadProduct);
      const response = await ProductModel.productUpdateModel(
        id,
        payloadProduct
      );
      expect(response).to.be.a("object");
    });
  });
  describe("Procurando todos produtos", () => {
    it("Verifica se retorna um array", async () => {
      const response = await ProductModel.getAllProductsModel();
      expect(response).to.be.a("array");
    });
  });
});


describe("Cria uma nova venda", () => {
  let connectionMock;

  const payloadProduct = {
    name: "Lapis",
    quantity: 1000,
  };

  const payloadSales = [
    {
      productId: "61dc47dd261576b698a8d28c",
      quantity: 400,
    },
  ];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
    await ProductModel.createProductModel(payloadProduct);
    await SaleModel.createSaleModel(payloadSales);
  });

  after(async () => {
    await connectionMock.db("StoreManager").collection("sales").drop();
    MongoClient.connect.restore();
  });
  describe("Testes do model sales", () => {
    it("Verifica se trouxe todos sales", async () => {
      const response = await SaleModel.listAllSalesModel();
      expect(response).to.be.a("array");
    });
    it("Verifica se cadastra corretamente", async () => {
      const { id } = await SaleModel.createSaleModel(payloadSales);
      const sales = await connectionMock
        .db("StoreManager")
        .collection("sales")
        .findOne({ _id: id });
      expect(sales).to.be.not.null;
    });
    it("Verifica se encontra o sale correto por id", async () => {
      const { id } = await SaleModel.createSaleModel(payloadSales);
      const result = await SaleModel.findSaleByIdModel(id);
      expect(result).to.be.a('object');
    });
  });
});

