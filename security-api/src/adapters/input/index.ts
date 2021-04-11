import express from "express";
import SecurityRoutes from "./routes/SecurityRoutes";
const router = express.Router();

router.use("/", SecurityRoutes);
export {router}