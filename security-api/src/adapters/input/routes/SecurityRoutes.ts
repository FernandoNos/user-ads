import express from "express";
import {register, login, updateUser, deleteUser} from "../controllers/SecurityController";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {getUsers} from "../controllers/UsersController";
const router = express.Router();


router.post("/register", register);
router.post("/login",[login,generateJWT])
router.patch("/user", [readJWT, updateUser])
router.delete("/user", [readJWT, deleteUser])
router.get("/user", getUsers)
export default router