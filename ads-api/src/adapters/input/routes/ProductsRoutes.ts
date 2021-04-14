import express from "express";
import * as ProductsController from '../controllers/ProductsController'
import {readJWT} from "../middlewares/JWTMiddleware";
import {isAdmin} from "../middlewares/IsAdminMiddleware";

const router = express.Router();

router.get("/",ProductsController.getProducts)
router.get("/:uuid", ProductsController.getProducts)

router.post("/", [readJWT,isAdmin,ProductsController.createProduct])

export {router}