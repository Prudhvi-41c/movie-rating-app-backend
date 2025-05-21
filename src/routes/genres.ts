import express from "express";
import { jwtVerification } from "../middlewares/auth";
import { fetchGenres } from "../controllers/genres";

const router = express.Router();

router.get("/genres", jwtVerification, fetchGenres);

export default router;
