import express from "express";
import {register, login, updateUser, deleteUser} from "../controllers/SecurityController";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {getUsers} from "../controllers/UsersController";
import {isAdmin} from "../middlewares/IsAdminMiddleware";
import {paramToLocals} from "../middlewares/ParamToLocals";
const router = express.Router();

//APIs for users to register and handle their own data
router.post("/register", register);
router.post("/login",[login,generateJWT])
router.patch("/user", [readJWT, updateUser])
router.delete("/user", [readJWT, deleteUser])
router.get("/user", getUsers)

//APIs for admins to update and delete users
router.delete("/user/:uuid", [readJWT, isAdmin, paramToLocals("user"),deleteUser])
router.patch("/user/:uuid", [readJWT, isAdmin, paramToLocals("user"),updateUser])
export default router