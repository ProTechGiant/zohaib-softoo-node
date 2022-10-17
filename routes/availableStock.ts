import { Router, NextFunction, Request, Response } from "express";

const router = Router();
import { getAvailableStock } from "../public/common/ReadJsonFile";

/* GET users listing. */

router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const skuId: any = req.query.id;
      const availableStock: any = await getAvailableStock(skuId);
      const { success, message, status, data } = availableStock;
      const { sku, stock, newAvailableStock } = data;
      if (!success) {
        res.render("error", {
          message: message,
          error: { status: status, success: success },
        });
      }

      res.render("stock", {
        sku: `${sku}`,
        stock: `${stock}`,
        available: `${newAvailableStock}`,
        message: message,
        error: { status: status, success: success },
      });
    } catch (error) {
      res.status(404).send(error);
    }
  }
);
export default router;
