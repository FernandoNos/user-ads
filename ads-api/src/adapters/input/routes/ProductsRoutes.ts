import express from "express";
import * as ProductsController from '../controllers/ProductsController'
import {readJWT} from "../middlewares/JWTMiddleware";
import {isAdmin} from "../middlewares/IsAdminMiddleware";

const router = express.Router();

router.get("/",ProductsController.get)
router.get("/:uuid", ProductsController.get)

router.post("/", [readJWT,isAdmin,ProductsController.create])

export {router}