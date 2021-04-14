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
router.use(readJWT)
router.patch("/user", updateUser)
router.delete("/user", deleteUser)

router.use(isAdmin)
//APIs for admins to update and delete users
router.delete("/user/:uuid", [paramToLocals("user"),deleteUser])
router.patch("/user/:uuid", [paramToLocals("user"),updateUser])
router.get("/user", getUsers)

export default router