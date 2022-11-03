import chai from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";
import { CommonInterface, Error } from "../src/common/types/stockInterface";
import { getAvaliableStock } from "../src/services/ReadJsonFile";

chai.use(chaiHttp);

describe("Avaliable Stock test-case", function () {
  it("get avaliable stock", function (done) {
    const sku = "SXB930757/87/87";
    getAvaliableStock(sku).then((response: CommonInterface | Error) => {
      expect(response.status).to.be.equal(200);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(
        "avaliable stock found successfully"
      );
      done();
    });
  });
  it("Stock Not Found", function (done) {
    const sku = "SXB9307D7/87/87";
    getAvaliableStock(sku).then((response: CommonInterface | Error) => {
      expect(response.status).to.be.equal(404);
      expect(response.success).to.be.equal(false);
      expect(response.message).to.be.equal(
        `Sorry Stock or Transaction inside Sku: "${sku}" not exist `
      );
      done();
    });
  });
  it("Stock Not Found", function (done) {
    const sku = "";
    getAvaliableStock(sku).then((response: CommonInterface | Error) => {
      expect(response.status).to.be.equal(403);
      expect(response.success).to.be.equal(false);
      expect(response.message).to.be.equal("Sku is required");

      done();
    });
  });
});
