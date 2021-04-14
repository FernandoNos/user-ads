import express from "express";
import { readJWT} from "../middlewares/JWTMiddleware";
import {addFavorite, deleteFavorite, getFavorites} from "../controllers/FavoriteProductsController";
import {deleteUser, updateUser} from "../controllers/SecurityController";
import {isAdmin} from "../middlewares/IsAdminMiddleware";
import {paramToLocals} from "../middlewares/ParamToLocals";
import {getUsers} from "../controllers/UsersController";
const router = express.Router();

router.use(readJWT)

router.delete("/users/favorites/:uuid", deleteFavorite)
router.post("/users/favorites", addFavorite)
router.get("/users/favorites", getFavorites)
router.patch("/user", updateUser)
router.delete("/user", deleteUser)

router.use(isAdmin)
//APIs for admins to update and delete users
router.delete("/user/:uuid", [paramToLocals("user"),deleteUser])
router.patch("/user/:uuid", [paramToLocals("user"),updateUser])
router.get("/user", getUsers)
export default router