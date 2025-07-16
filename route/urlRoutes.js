import express from "express";
const router = express.Router();

import {
  shortenUrl,
  redirectToOriginal,
  getAllUrls,
} from "../controllers/urlController.js";

router.post("/shorten", shortenUrl);
router.get("/urls", getAllUrls);
router.get("/:shortId", redirectToOriginal);

export default router;
