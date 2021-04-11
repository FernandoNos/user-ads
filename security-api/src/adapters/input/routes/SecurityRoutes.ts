import express from "express";
import {register,login} from "../controllers/SecurityController";
import {generateJWT} from "../middlewares/JWTMiddleware";
const router = express.Router();


router.post("/register", register);
router.post("/login",[login,generateJWT])
export default router