import express from "express";
import {
  createCollectionItem,
  deleteCollectionItem,
  getDashboardData,
  getPublicSite,
  getSingleton,
  listCollection,
  submitContactMessage,
  updateCollectionItem,
  updateSiteConfig,
  upsertSingleton
} from "../controllers/siteController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/public", getPublicSite);
router.post("/contact", submitContactMessage);

router.get("/admin/dashboard", protect, getDashboardData);
router.put("/admin/config", protect, updateSiteConfig);
router.get("/admin/single/:key", protect, getSingleton);
router.put("/admin/single/:key", protect, upsertSingleton);
router.get("/admin/collection/:key", protect, listCollection);
router.post("/admin/collection/:key", protect, createCollectionItem);
router.put("/admin/collection/:key/:id", protect, updateCollectionItem);
router.delete("/admin/collection/:key/:id", protect, deleteCollectionItem);

export default router;
