import express from "express";
import { fetchFilteredContent, fetchLatestReleasesContent,fetchTopRatedContent } from "../controllers/content";

const router = express.Router();

router.get("/", fetchFilteredContent);
router.get("/latest-releases", fetchLatestReleasesContent);
router.get("/top-rated",fetchTopRatedContent)
export default router;
