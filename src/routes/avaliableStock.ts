import { Router } from "express";
import avaliableStockController from "../controllers/avaliableStock";

const router = Router();

/* GET users listing. */

router.get("/", avaliableStockController.api);

export default router;
