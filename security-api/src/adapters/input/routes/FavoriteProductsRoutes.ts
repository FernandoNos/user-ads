import express from "express";
import {generateJWT, readJWT} from "../middlewares/JWTMiddleware";
import {addFavorite} from "../controllers/FavoriteProductsController";
const router = express.Router();


// router.post("/register", register);
// router.post("/favorites",[login,generateJWT])
router.post("/users/favorites", [readJWT, addFavorite])
// router.delete("/user", [readJWT, deleteUser])
// router.get("/user", getUsers)
export default router