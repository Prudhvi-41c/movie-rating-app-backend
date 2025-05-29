import express from "express";
import { jwtVerification } from "../middlewares/auth";
import { fetchGenres } from "../controllers/genres";

const router = express.Router();

router.get("/", jwtVerification, fetchGenres);

export default router;
