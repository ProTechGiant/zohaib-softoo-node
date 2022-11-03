import fs from "fs";
import path from "path";
import {
  CommonInterface,
  Error,
  AvaliableStock,
  Transactions,
} from "../common/types/stockInterface";

let filePath: string;

export async function getFile(
  fileName: string
): Promise<AvaliableStock | Transactions | Error> {
  filePath = path.join(__dirname, fileName);

  const promise = new Promise<AvaliableStock | Transactions | Error>(function (
    resolve,
    reject
  ) {
    return fs.readFile(
      filePath,
      { encoding: "utf-8" },
      function (err, data: string) {
        if (!err) {
          const readFile = JSON.parse(data);
          resolve(readFile);
        }
        reject(err);
      }
    );
  });

  return promise;
}

export async function getAvaliableStock(
  sku: string
): Promise<CommonInterface | Error> {
  if (!sku) {
    const resStock: Error = {
      status: 403,
      message: "Sku is required",
      success: false,
    };
    return resStock;
  }

  let refundOrder = 0,
    orderSum = 0,
    saleCurrent = 0,
    avaliableStock: AvaliableStock = {
      sku: "",
      stock: 0,
      newAvaliableStock: 0,
    },
    status = 404,
    success = false;
  const id: string = sku;
  let message = `Sorry Stock or Transaction inside Sku: "${id}" not exist `;

  const transactionsFile = await getFile(
    "../common/utils/jsonData/transactions.json"
  );

  const stockFile = await getFile("../common/utils/jsonData/stock.json");
  if (Array.isArray(stockFile)) {
    const findSkuId: AvaliableStock = stockFile.find(
      (item: AvaliableStock) => item.sku === id
    );

    if (Array.isArray(transactionsFile)) {
      const findSkuIdTransaction: Transactions = transactionsFile.find(
        (item: Transactions) => item.sku === id
      );

      if (findSkuId && findSkuIdTransaction) {
        transactionsFile
          .filter((x: Transactions) => x.sku === findSkuId.sku)
          .forEach((x: Transactions) => {
            if (x.type == "refund") {
              refundOrder = refundOrder + x.qty;
            } else {
              orderSum = orderSum + x.qty;
            }
          });

        saleCurrent = orderSum - refundOrder;
        avaliableStock = findSkuId;
        avaliableStock["newAvaliableStock"] = findSkuId.stock - saleCurrent;
        status = 200;
        success = true;
        message = "avaliable stock found successfully";
      }
    }
  }

  const resStock: CommonInterface = {
    message,
    status,
    success,
    data: avaliableStock,
  };

  return resStock;
}
