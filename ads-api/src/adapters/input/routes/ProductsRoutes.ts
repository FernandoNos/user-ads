import express from "express";
import * as ProductsController from '../controllers/ProductsController'
import {readJWT} from "../middlewares/JWTMiddleware";
import {isAdmin} from "../middlewares/IsAdminMiddleware";

const router = express.Router();

router.use(readJWT)
router.get("/",ProductsController.getProducts)
router.get("/:uuid", ProductsController.getProduct)
router.post("/", [isAdmin,ProductsController.createProduct])

export {router}