import express from "express";
import * as ProductsController from '../controllers/ProductsController'

const router = express.Router();

router.get("/",ProductsController.getProducts)
router.get("/:uuid", ProductsController.getProduct)
router.post("/", ProductsController.createProduct)

export {router}