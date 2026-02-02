import express from "express";
import * as menuCtrl from "../controllers/menuItem.controller.js";

const router = express.Router();

router.get("/", menuCtrl.getMenuItems);
router.get("/search", menuCtrl.searchMenuItems);
router.get("/:id", menuCtrl.getMenuItemById);
router.post("/", menuCtrl.createMenuItem);
router.put("/:id", menuCtrl.updateMenuItem);
router.delete("/:id", menuCtrl.deleteMenuItem);
router.patch("/:id/availability", menuCtrl.toggleAvailability);

export default router;