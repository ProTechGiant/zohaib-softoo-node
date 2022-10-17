import chai from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";

import { getAvailableStock } from "../public/common/ReadJsonFile";
chai.use(chaiHttp);
const sku = "SXB930757/87/87";
let findAvailableStock: any;
before(async function () {
  findAvailableStock = await getAvailableStock(sku);
});

describe("Available Stock test-case", function () {
  it("get available stock", async function (done) {
    if (findAvailableStock.status) {
      expect(findAvailableStock.status).to.be.equal(200);
      expect(findAvailableStock.success).to.be.equal(true);
      expect(findAvailableStock.message).to.be.equal(
        "available stock found successfully"
      );
    } else {
      expect(findAvailableStock.status).to.be.equal(404);
      expect(findAvailableStock.success).to.be.equal(false);
      expect(findAvailableStock.message).to.be.equal(
        "available stock found successfully"
      );
    }
    done();
  });
});
