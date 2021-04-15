import express from "express";
import SecurityRoutes from "./routes/SecurityRoutes";
import UsersRoutes from "./routes/UsersRoutes";
const router = express.Router();

router.use("/", SecurityRoutes);
router.use("/",UsersRoutes)
export {router}