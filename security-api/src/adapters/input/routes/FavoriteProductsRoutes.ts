import express from "express";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {addFavorite, deleteFavorite, getFavorites} from "../controllers/FavoriteProductsController";
const router = express.Router();

router.delete("/users/favorites/:uuid", [readJWT, deleteFavorite])
router.post("/users/favorites", [readJWT, addFavorite])
router.get("/users/favorites", [readJWT, getFavorites])

export default router