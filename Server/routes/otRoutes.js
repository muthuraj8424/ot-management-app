const express = require("express");
const {
  addOT,
  getOTs,
  updateOT,
  fetchById,
  deletedOT,
  assignPatientToOT,
  
} = require("../controllers/otController");
const authMiddleware = require("../middleware/AuthMIdd");

const router = express.Router();

// Admin routes
router.post("/add",authMiddleware, addOT); // Add a new OT
router.get("/", getOTs); // Get all OTs
router.put("/:id",authMiddleware, updateOT); // Get all OTs
router.get("/:id", fetchById); // Get all OTs
router.delete("/:id",authMiddleware, deletedOT); // Get all OTs
router.post("/admittoOT",authMiddleware, assignPatientToOT); // Get all OTs
// router.post("/discharge", dischargePatientFromOT); // Get all OTs

// router.get("/:id", updateOTS); // Get all OTs

// Staff routes
// router.post('/schedule', scheduleSurgery); // Schedule a surgery

module.exports = router;
