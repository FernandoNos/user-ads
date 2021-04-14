import express from "express";
import {register, login} from "../controllers/SecurityController";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
const router = express.Router();

//APIs for users to register and handle their own data
router.post("/register", register);
router.post("/login",[login,generateJWT])


export default router