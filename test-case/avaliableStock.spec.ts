import chai from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";
import { CommonInterface, Error } from "../src/common/types/stockInterface";
import { getAvaliableStock } from "../src/services/ReadJsonFile";

chai.use(chaiHttp);
const sku = "SXB930757/87/87";

let findAvaliableStock: CommonInterface;
before(async function () {
  findAvaliableStock = await getAvaliableStock(sku);
});

describe("Avaliable Stock test-case", function () {
  it("get avaliable stock", async function (done) {
    if (
      !(findAvaliableStock instanceof Error) &&
      findAvaliableStock !== undefined
    ) {
      if (findAvaliableStock.success) {
        expect(findAvaliableStock.status).to.be.equal(200);
        expect(findAvaliableStock.success).to.be.equal(true);
        expect(findAvaliableStock.message).to.be.equal(
          "avaliable stock found successfully"
        );
        expect(findAvaliableStock.data).to.be.a("object");
      }
    } else {
      expect(findAvaliableStock.status)
        .to.be.equal(404)
        .to.throw("Internal Server Error");
    }

    done();
  });
});

//chai http testcase
