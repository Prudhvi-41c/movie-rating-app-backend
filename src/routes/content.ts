import express from "express";
import { jwtVerification } from "../middlewares/auth";
import { fetchFilteredContent, fetchLatestReleasesContent,fetchTopRatedContent } from "../controllers/content";

const router = express.Router();

router.get("/", jwtVerification, fetchFilteredContent);
router.get("/latest-releases", jwtVerification, fetchLatestReleasesContent);
router.get("/top-rated",jwtVerification,fetchTopRatedContent)
export default router;
