import express from "express";
import {register, login, updateUser, deleteUser} from "../controllers/SecurityController";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {getUsers} from "../controllers/UsersController";
import {isAdmin} from "../middlewares/IsAdminMiddleware";
import {paramToLocals} from "../middlewares/ParamToLocals";
const router = express.Router();


router.post("/register", register);
router.post("/login",[login,generateJWT])
router.patch("/user", [readJWT, updateUser])
router.delete("/user", [readJWT, deleteUser])
router.get("/user", getUsers)

router.delete("/user/:uuid", [readJWT, isAdmin, paramToLocals("user"),deleteUser])
export default router