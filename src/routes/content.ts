import express from "express";
import { jwtVerification } from "../middlewares/auth";
import { fetchFilteredContent } from "../controllers/content";

const router = express.Router();

router.get("/", jwtVerification, fetchFilteredContent);

export default router;
