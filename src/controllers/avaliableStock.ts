import { Request, Response } from "express";
import { CommonInterface } from "../common/types/stockInterface";

import { getAvaliableStock } from "../services/ReadJsonFile";

/* GET users listing. */

const avaliableStockController = {
  async api(req: Request, res: Response) {
    console.log("object", req.query);
    const skuId: string = req.query.id as string;

    try {
      const avaliableStock: CommonInterface = await getAvaliableStock(skuId);
      const { message, status, success } = avaliableStock;

      if (!avaliableStock.success) {
        return res
          .status(avaliableStock.status)
          .json({ message, status, success });
      }

      return res.status(avaliableStock.status).json(avaliableStock);
    } catch (error) {
      return res.status(404).send(error);
    }
  },
};
export default avaliableStockController;
