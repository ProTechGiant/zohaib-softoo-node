const fs = require("fs"),
  path = require("path");
import { AvailableStock, Stock, Transactions } from "./stockInterface";

export const getFile = async (fileName: string): Promise<JSON | Error> => {
  const filePath = path.join(__dirname, fileName);

  let promise: Promise<JSON | Error> = new Promise(function (resolve, reject) {
    return fs.readFile(
      filePath,
      { encoding: "utf-8" },
      function (err: Error, data: string) {
        if (!err) {
          const readFile = JSON.parse(data);
          resolve(readFile);
        } else {
          reject(err);
        }
      }
    );
  });

  return promise;
};

export const getAvailableStock = async (sku: string) => {
  let refundOrder = 0,
    orderSum = 0,
    saleCurrent = 0,
    availableStock: AvailableStock = {},
    message,
    id = sku,
    status = 404,
    success = false;

  try {
    const transactionsFile: any = await getFile(
      "../jsonData/transactions.json"
    );
    const stockFile: any = await getFile("../jsonData/stock.json");

    const findSkuId = stockFile.find((item: Stock) => item.sku === id);

    const findSkuIdTransaction = transactionsFile.find(
      (item: Transactions) => item.sku === id
    );

    if (findSkuId && findSkuIdTransaction) {
      transactionsFile
        .filter((x: Transactions) => x.sku === findSkuId.sku)
        .map((x: Transactions) => {
          if (x.type == "refund") {
            refundOrder = refundOrder + x.qty;
          } else {
            orderSum = orderSum + x.qty;
          }
        });

      saleCurrent = orderSum - refundOrder;
      availableStock = findSkuId;
      availableStock["newAvailableStock"] = findSkuId.stock - saleCurrent;
      status = 200;
      success = true;
      message = "available stock found successfully";
    } else {
      if (findSkuId === undefined) {
        message = `Sorry Stock inside Sku: "${id}" not exist `;
      } else if (findSkuIdTransaction === undefined) {
        message = `Sorry no any Transaction found Sku : "${id}"`;
      }
    }
    const resStock = {
      message,
      status,
      success,
      data: availableStock,
    };

    return resStock;
  } catch (error) {
    return error;
  }
};
