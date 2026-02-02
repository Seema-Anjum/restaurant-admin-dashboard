import express from "express";
import { getTopSellers } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/top-selling", getTopSellers);

export default router;