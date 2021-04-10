import express from "express";
import {register} from "../controllers/SecurityController";
const router = express.Router();


router.post("/register", register);

export default router