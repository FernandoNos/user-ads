import express from "express";
import SecurityRoutes from "./routes/SecurityRoutes";
const router = express.Router();
const protectedRouter = express.Router();
const unprotectedRouter = express.Router();


unprotectedRouter.use('/',SecurityRoutes)
router.use("/", unprotectedRouter);
router.use("/", protectedRouter);
export {router}