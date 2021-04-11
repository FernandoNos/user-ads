import express from "express";
import * as ProductsRoutes from './routes/ProductsRoutes'
const router = express.Router();

router.use("/product",ProductsRoutes.router)

export {router}