import express from "express";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {addFavorite, deleteFavorite, getFavorites} from "../controllers/FavoriteProductsController";
const router = express.Router();


// router.post("/register", register);
// router.post("/favorites",[login,generateJWT])
router.delete("/users/favorites/:uuid", [readJWT, deleteFavorite])
router.post("/users/favorites", [readJWT, addFavorite])
router.get("/users/favorites", [readJWT, getFavorites])
// router.delete("/user", [readJWT, deleteUser])
// router.get("/user", getUsers)
export default router