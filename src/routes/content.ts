import express from "express";
import { jwtVerification } from "../middlewares/auth";
import { fetchFilteredContent } from "../controllers/content";
import { Request, Response } from "express";

const router = express.Router();

router.get("/content",jwtVerification,fetchFilteredContent);

export default router;
