import express from "express";
import SecurityRoutes from "./routes/SecurityRoutes";
import FavoriteProductsRoutes from "./routes/FavoriteProductsRoutes";
const router = express.Router();

router.use("/", SecurityRoutes);
router.use("/",FavoriteProductsRoutes)
export {router}